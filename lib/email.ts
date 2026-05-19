import nodemailer from "nodemailer";
import { ConsultationLead } from "@/lib/consultation";
import { OrderRecord } from "@/lib/order";
import { formatCurrency } from "@/lib/utils";

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getTransporter() {
  return nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port: Number(getRequiredEnv("SMTP_PORT")),
    secure: Number(getRequiredEnv("SMTP_PORT")) === 465,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS"),
    },
  });
}

function getBrandName() {
  return process.env.BRAND_NAME?.trim() || "Twakka Tukka";
}

function getEmailFrom() {
  return getRequiredEnv("EMAIL_FROM");
}

function getBusinessEmail() {
  return getRequiredEnv("BUSINESS_EMAIL");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createEmailShell(content: string, preview: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(preview)}</title>
  </head>
  <body style="margin:0;padding:0;background:#fff7ec;font-family:Arial,sans-serif;color:#1e1a16;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff7ec;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #f0dbc0;">
            ${content}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function createBusinessOrderHtml(order: OrderRecord) {
  const brandName = getBrandName();

  return createEmailShell(
    `
    <tr>
      <td style="padding:32px;background:linear-gradient(135deg,#e35b2f,#ffb84d);color:#ffffff;">
        <div style="font-size:12px;letter-spacing:3px;font-weight:700;text-transform:uppercase;opacity:0.85;">${escapeHtml(brandName)}</div>
        <h1 style="margin:14px 0 0;font-size:32px;line-height:1.2;">Order received</h1>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.7;opacity:0.92;">A new cash on delivery order has been placed from the landing page.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:20px;background:#fff4df;border-radius:18px;">
          <tr>
            <td style="padding:18px 20px;">
              <div style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#bf3d1b;">Order summary</div>
              <p style="margin:12px 0 0;font-size:15px;color:#6c6257;line-height:1.8;">
                <strong style="color:#1e1a16;">Order ID:</strong> ${escapeHtml(order.orderId)}<br />
                <strong style="color:#1e1a16;">Date &amp; Time:</strong> ${escapeHtml(order.orderDateTime)}<br />
                <strong style="color:#1e1a16;">Order Status:</strong> <span style="display:inline-block;background:#ffe7cf;color:#bf3d1b;padding:4px 10px;border-radius:999px;font-weight:700;">New Order</span>
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:18px;">
          <tr>
            <td style="padding:0 0 12px;font-size:18px;font-weight:700;color:#1e1a16;">Customer details</td>
          </tr>
          <tr>
            <td style="padding:18px 20px;border:1px solid #f0dbc0;border-radius:18px;">
              <p style="margin:0;font-size:15px;line-height:1.9;color:#6c6257;">
                <strong style="color:#1e1a16;">Customer Name:</strong> ${escapeHtml(order.customerName)}<br />
                <strong style="color:#1e1a16;">Phone Number:</strong> ${escapeHtml(order.phoneNumber)}<br />
                <strong style="color:#1e1a16;">Email Address:</strong> ${escapeHtml(order.emailAddress)}<br />
                <strong style="color:#1e1a16;">Exact Location:</strong> ${escapeHtml(order.exactLocation)}
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:18px;">
          <tr>
            <td style="padding:0 0 12px;font-size:18px;font-weight:700;color:#1e1a16;">Product details</td>
          </tr>
          <tr>
            <td style="padding:18px 20px;border:1px solid #f0dbc0;border-radius:18px;">
              <p style="margin:0;font-size:15px;line-height:1.9;color:#6c6257;">
                <strong style="color:#1e1a16;">Product Name:</strong> ${escapeHtml(order.productName)}<br />
                <strong style="color:#1e1a16;">Quantity:</strong> ${order.quantity}<br />
                <strong style="color:#1e1a16;">Price Per Piece:</strong> ${formatCurrency(order.pricePerPiece)}<br />
                <strong style="color:#1e1a16;">Total Price:</strong> ${formatCurrency(order.totalPrice)}
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;">
          <tr>
            <td style="padding:0 0 12px;font-size:18px;font-weight:700;color:#1e1a16;">Payment details</td>
          </tr>
          <tr>
            <td style="padding:18px 20px;border:1px solid #f0dbc0;border-radius:18px;">
              <p style="margin:0;font-size:15px;line-height:1.9;color:#6c6257;">
                <strong style="color:#1e1a16;">Payment Method:</strong> Cash On Delivery<br />
                <strong style="color:#1e1a16;">Order Status:</strong> New Order
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff1d8;border-left:4px solid #e35b2f;border-radius:14px;">
          <tr>
            <td style="padding:18px 20px;font-size:15px;line-height:1.8;color:#6b3a1b;">
              Please call the customer soon to confirm this order.
            </td>
          </tr>
        </table>
      </td>
    </tr>
    `,
    `New Product Order Received - ${order.orderId}`,
  );
}

function createCustomerOrderHtml(order: OrderRecord) {
  const brandName = getBrandName();
  const replyTo = getEmailFrom();

  return createEmailShell(
    `
    <tr>
      <td style="padding:32px;background:linear-gradient(135deg,#fff2db,#ffffff);border-bottom:1px solid #f2dec4;">
        <div style="font-size:12px;letter-spacing:3px;font-weight:700;text-transform:uppercase;color:#bf3d1b;">${escapeHtml(brandName)}</div>
        <h1 style="margin:14px 0 0;font-size:30px;line-height:1.2;color:#1e1a16;">Your order has been received</h1>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.7;color:#6c6257;">Thank you for ordering with us. We have received your cash on delivery order successfully.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;">
        <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#6c6257;">
          Hi ${escapeHtml(order.customerName)},
        </p>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.8;color:#6c6257;">
          Thank you for your order. Our sales representative will call you soon to confirm your order.
        </p>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff8ee;border:1px solid #f0dbc0;border-radius:18px;margin-bottom:20px;">
          <tr>
            <td style="padding:20px;">
              <div style="font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#bf3d1b;">Order details</div>
              <p style="margin:14px 0 0;font-size:15px;line-height:1.9;color:#6c6257;">
                <strong style="color:#1e1a16;">Order ID:</strong> ${escapeHtml(order.orderId)}<br />
                <strong style="color:#1e1a16;">Product:</strong> ${escapeHtml(order.productName)}<br />
                <strong style="color:#1e1a16;">Quantity:</strong> ${order.quantity}<br />
                <strong style="color:#1e1a16;">Total Price:</strong> ${formatCurrency(order.totalPrice)}<br />
                <strong style="color:#1e1a16;">Payment Method:</strong> Cash On Delivery
              </p>
            </td>
          </tr>
        </table>

        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fff1d8;border-radius:14px;margin-bottom:20px;">
          <tr>
            <td style="padding:18px 20px;font-size:15px;line-height:1.8;color:#6b3a1b;">
              Our sales representative will call you soon to confirm your order.
            </td>
          </tr>
        </table>

        <p style="margin:0 0 12px;font-size:15px;line-height:1.8;color:#6c6257;">
          If you need help, just reply to this email or contact us at ${escapeHtml(replyTo)}.
        </p>
        <p style="margin:0;font-size:15px;line-height:1.8;color:#6c6257;">
          Thank you,<br />
          <strong style="color:#1e1a16;">${escapeHtml(brandName)}</strong>
        </p>
      </td>
    </tr>
    `,
    `Your Order Has Been Received - ${brandName}`,
  );
}

export async function sendBusinessOrderEmail(order: OrderRecord) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: getEmailFrom(),
    to: getBusinessEmail(),
    replyTo: getEmailFrom(),
    subject: `New Product Order Received - ${order.orderId}`,
    html: createBusinessOrderHtml(order),
  });
}

export async function sendCustomerOrderEmail(order: OrderRecord) {
  const transporter = getTransporter();
  const brandName = getBrandName();

  await transporter.sendMail({
    from: getEmailFrom(),
    to: order.emailAddress,
    replyTo: getEmailFrom(),
    subject: `Your Order Has Been Received - ${brandName}`,
    html: createCustomerOrderHtml(order),
  });
}

function createBusinessConsultationHtml(lead: ConsultationLead) {
  const brandName = getBrandName();

  return createEmailShell(
    `
    <tr>
      <td style="padding:32px;background:linear-gradient(135deg,#2ea5f2,#7edb4a);color:#ffffff;">
        <div style="font-size:12px;letter-spacing:3px;font-weight:700;text-transform:uppercase;opacity:0.85;">${escapeHtml(brandName)}</div>
        <h1 style="margin:14px 0 0;font-size:30px;line-height:1.2;">New consultation lead</h1>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.7;opacity:0.92;">A new business owner submitted the consultation form.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;">
        <p style="margin:0;font-size:15px;line-height:1.9;color:#5d7188;">
          <strong style="color:#13314e;">Submitted At:</strong> ${escapeHtml(lead.submittedAt)}<br />
          <strong style="color:#13314e;">Full Name:</strong> ${escapeHtml(lead.fullName)}<br />
          <strong style="color:#13314e;">Email:</strong> ${escapeHtml(lead.email)}<br />
          <strong style="color:#13314e;">WhatsApp Number:</strong> ${escapeHtml(lead.whatsapp)}<br />
          <strong style="color:#13314e;">Business Name:</strong> ${escapeHtml(lead.businessName)}<br />
          <strong style="color:#13314e;">Website / Facebook:</strong> ${escapeHtml(lead.website)}<br />
          <strong style="color:#13314e;">Message:</strong> ${escapeHtml(lead.message || "-")}
        </p>
      </td>
    </tr>
    `,
    `New consultation lead from ${lead.fullName}`,
  );
}

function createCustomerConsultationHtml(lead: ConsultationLead) {
  const brandName = getBrandName();

  return createEmailShell(
    `
    <tr>
      <td style="padding:32px;background:linear-gradient(135deg,#f4fbff,#f6fff2);border-bottom:1px solid #e4eef7;">
        <div style="font-size:12px;letter-spacing:3px;font-weight:700;text-transform:uppercase;color:#2ea5f2;">${escapeHtml(brandName)}</div>
        <h1 style="margin:14px 0 0;font-size:30px;line-height:1.2;color:#13314e;">We received your consultation request</h1>
        <p style="margin:12px 0 0;font-size:16px;line-height:1.7;color:#5d7188;">Thank you for booking your free 1:1 consultation.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 32px;">
        <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#5d7188;">Hi ${escapeHtml(lead.fullName)},</p>
        <p style="margin:0 0 16px;font-size:16px;line-height:1.8;color:#5d7188;">
          We received your details successfully. We will review your business information and contact you with the next steps.
        </p>
        <p style="margin:0;font-size:15px;line-height:1.8;color:#5d7188;">
          Business Name: <strong style="color:#13314e;">${escapeHtml(lead.businessName)}</strong><br />
          WhatsApp Number: <strong style="color:#13314e;">${escapeHtml(lead.whatsapp)}</strong>
        </p>
      </td>
    </tr>
    `,
    `Your consultation request was received`,
  );
}

export async function sendBusinessConsultationEmail(lead: ConsultationLead) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: getEmailFrom(),
    to: getBusinessEmail(),
    replyTo: lead.email,
    subject: `New consultation lead - ${lead.fullName}`,
    html: createBusinessConsultationHtml(lead),
  });
}

export async function sendCustomerConsultationEmail(lead: ConsultationLead) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: getEmailFrom(),
    to: lead.email,
    replyTo: getEmailFrom(),
    subject: `We received your consultation request`,
    html: createCustomerConsultationHtml(lead),
  });
}
