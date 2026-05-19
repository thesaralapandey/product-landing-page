# Twakka Tukka COD Funnel

This project is a production-ready Cash On Delivery sales funnel built with Next.js App Router and Tailwind CSS. It includes:

- Product landing page at `/`
- Checkout page at `/checkout`
- Thank-you page at `/thank-you`
- Secure order API at `/api/order`
- Google Sheets order saving
- Business order email notification
- Customer order received email

## Recommended tech stack

- Next.js App Router for frontend and API routes
- Tailwind CSS for the landing page and checkout UI
- Google Sheets API via service account for order storage
- Nodemailer with SMTP for sending business and customer emails
- Zod for strong server-side payload validation

## How the order flow works

1. A customer selects an item or combo and quantity on the landing page.
2. The selected SKU and quantity are passed to `/checkout` through the URL.
3. The checkout page fills in product name, quantity, price per piece, and total price automatically.
4. The customer submits contact and location details.
5. `POST /api/order` validates the payload, rebuilds canonical pricing from the selected SKU, and generates a unique order ID.
6. The server writes the order to Google Sheets.
7. The server sends the business order email.
8. The server sends the customer confirmation email.
9. Only after all required steps succeed does the frontend redirect the customer to `/thank-you`.

## Environment variables you need later

Copy `.env.example` to `.env.local` and add your real values:

```bash
NEXT_PUBLIC_SITE_URL=
BUSINESS_EMAIL=
EMAIL_FROM=
BRAND_NAME=

GOOGLE_SHEET_ID=
GOOGLE_SHEET_TAB_NAME=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

EMAIL_SERVICE_API_KEY=

FRONTEND_URL=
```

Notes:

- `BUSINESS_EMAIL`: where order notification emails should arrive
- `EMAIL_FROM`: sender and reply-to email shown to customers
- `GOOGLE_PRIVATE_KEY`: keep the full private key in one line with `\n` escapes if needed
- `FRONTEND_URL`: your deployed frontend URL, such as `https://your-site.vercel.app`

## Google Spreadsheet setup

Create a Google Sheet and use the tab name `Twakka Order` or update `GOOGLE_SHEET_TAB_NAME` to match your own tab.

Use these columns in row 1:

1. Order ID
2. Date & Time
3. Customer Name
4. Phone Number
5. Email Address
6. Exact Location
7. Product Name
8. Quantity
9. Price Per Piece
10. Total Price
11. Payment Method
12. Order Status
13. Notes

The API can automatically add the header row if the sheet is empty, but keeping the columns ready is the cleanest setup.

### How to add filters in Google Sheets

1. Select row 1.
2. Open `Data > Create a filter`.
3. Use the filter icons to sort by date, order status, or product name.

### How to add dropdown options for Order Status

1. Select the `Order Status` column.
2. Open `Data > Data validation`.
3. Choose `Dropdown`.
4. Add these options:
   - New Order
   - Order Confirmed
   - Order Ongoing
   - Delivered
   - Cancelled

### How to get the Google Sheet ID

Open your Google Sheet and copy the ID from the URL:

```text
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0
```

### How to share the Google Sheet with the service account

1. Create a Google Cloud service account with Google Sheets API enabled.
2. Copy the service account email into `GOOGLE_SERVICE_ACCOUNT_EMAIL`.
3. Open your Google Sheet and click `Share`.
4. Add the service account email as an editor.

## Email notification setup

This project uses Nodemailer with SMTP.

Required SMTP fields:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`

Recommended options:

- Gmail SMTP with an app password
- Brevo SMTP
- SendGrid SMTP
- Any trusted SMTP provider

The app sends:

- A business order email to `BUSINESS_EMAIL`
- A customer confirmation email to the email entered in checkout

## Local development

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to test order submission

1. Add all required `.env.local` values.
2. Run `npm run dev`.
3. Open the landing page and choose an item or combo.
4. Go through checkout and submit a test order.
5. Confirm that:
   - The order row appears in Google Sheets
   - The business email arrives in your inbox
   - The customer confirmation email arrives in the customer inbox
   - The site redirects to `/thank-you`

If Sheets saving works but email sending fails, the API returns an error so you can fix SMTP settings before using the funnel in production.

## Deployment on Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add all environment variables in the Vercel project settings.
4. Redeploy after saving the variables.
5. Set `NEXT_PUBLIC_SITE_URL` and `FRONTEND_URL` to your production domain.
6. Run a live order test after deployment to verify Sheets and email delivery.

## Project structure

- `app/page.tsx`: landing page
- `app/checkout/page.tsx`: checkout page
- `app/thank-you/page.tsx`: thank-you page
- `app/api/order/route.ts`: secure order submission route
- `components/landing-page.tsx`: funnel UI
- `components/checkout-form.tsx`: checkout form client logic
- `lib/product-data.ts`: editable product content and offer pricing
- `lib/catalog.ts`: selection helpers
- `lib/google-sheets.ts`: Google Sheets integration
- `lib/email.ts`: HTML email templates and SMTP delivery
- `lib/order.ts`: order model and helpers
- `lib/validation.ts`: form validation schema
