import { google } from "googleapis";
import { ConsultationLead } from "@/lib/consultation";
import { OrderRecord } from "@/lib/order";

const ORDER_HEADERS = [
  "Order ID",
  "Date & Time",
  "Customer Name",
  "Phone Number",
  "Email Address",
  "Exact Location",
  "Product Name",
  "Quantity",
  "Price Per Piece",
  "Total Price",
  "Payment Method",
  "Order Status",
  "Notes",
];

const CONSULTATION_HEADERS = [
  "Submitted At",
  "Full Name",
  "Email",
  "WhatsApp Number",
  "Business Name",
  "Website or Facebook Page Link",
  "Message",
];

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function resolveTabName(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
) {
  const configuredTabName = process.env.GOOGLE_SHEET_TAB_NAME?.trim();

  if (configuredTabName) {
    return configuredTabName;
  }

  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const firstTabName = spreadsheet.data.sheets?.[0]?.properties?.title?.trim();

  if (!firstTabName) {
    throw new Error("Could not determine a Google Sheet tab name.");
  }

  return firstTabName;
}

async function ensureSheetExists(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string,
) {
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const exists = spreadsheet.data.sheets?.some(
    (sheet) => sheet.properties?.title === tabName,
  );

  if (exists) {
    return;
  }

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          addSheet: {
            properties: {
              title: tabName,
            },
          },
        },
      ],
    },
  });
}

function createSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      private_key: getRequiredEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function ensureHeaderRow(
  sheets: ReturnType<typeof google.sheets>,
  spreadsheetId: string,
  tabName: string,
  headers: string[],
) {
  const endColumn = String.fromCharCode(64 + headers.length);
  const headerRange = `${tabName}!A1:${endColumn}1`;
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: headerRange,
  });

  const values = existing.data.values?.[0] ?? [];

  const isExactMatch =
    values.length === headers.length &&
    values.every((value, index) => value === headers[index]);

  if (isExactMatch) {
    return;
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: headerRange,
    valueInputOption: "RAW",
    requestBody: {
      values: [headers],
    },
  });
}

export function getGoogleSheetHeaders() {
  return ORDER_HEADERS;
}

export function getConsultationSheetHeaders() {
  return CONSULTATION_HEADERS;
}

export async function appendOrderToSheet(
  order: OrderRecord,
  headers: string[],
) {
  try {
    const spreadsheetId = getRequiredEnv("GOOGLE_SHEET_ID");
    const sheets = createSheetsClient();
    const tabName = await resolveTabName(sheets, spreadsheetId);

    await ensureHeaderRow(sheets, spreadsheetId, tabName, ORDER_HEADERS);

    const row = [
      order.orderId,
      order.orderDateTime,
      order.customerName,
      order.phoneNumber,
      order.emailAddress,
      order.exactLocation,
      order.productName,
      String(order.quantity),
      String(order.pricePerPiece),
      String(order.totalPrice),
      order.paymentMethod,
      order.orderStatus,
      order.notes,
    ];

    if (headers.length !== row.length) {
      throw new Error("Google Sheet header length does not match order row length.");
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:M`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });
  } catch (error) {
    const googleError = error as {
      code?: number;
      response?: { data?: { error?: { status?: string } } };
    };

    if (
      googleError.code === 403 ||
      googleError.response?.data?.error?.status === "PERMISSION_DENIED"
    ) {
      throw new Error(
        `Google Sheets access denied. Share the spreadsheet with ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL} as an editor.`,
      );
    }

    throw error;
  }
}

export async function appendConsultationLeadToSheet(
  lead: ConsultationLead,
  headers: string[],
) {
  try {
    const spreadsheetId = getRequiredEnv("GOOGLE_SHEET_ID");
    const tabName =
      process.env.CONSULTATION_SHEET_TAB_NAME?.trim() || "Consultation Leads";
    const sheets = createSheetsClient();

    await ensureSheetExists(sheets, spreadsheetId, tabName);
    await ensureHeaderRow(
      sheets,
      spreadsheetId,
      tabName,
      CONSULTATION_HEADERS,
    );

    const row = [
      lead.submittedAt,
      lead.fullName,
      lead.email,
      lead.whatsapp,
      lead.businessName,
      lead.website,
      lead.message,
    ];

    if (headers.length !== row.length) {
      throw new Error(
        "Google Sheet header length does not match consultation row length.",
      );
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:G`,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [row],
      },
    });
  } catch (error) {
    const googleError = error as {
      code?: number;
      response?: { data?: { error?: { status?: string } } };
    };

    if (
      googleError.code === 403 ||
      googleError.response?.data?.error?.status === "PERMISSION_DENIED"
    ) {
      throw new Error(
        `Google Sheets access denied. Share the spreadsheet with ${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL} as an editor.`,
      );
    }

    throw error;
  }
}
