import PolicyLayout from "@/app/components/PolicyLayout";

export const metadata = {
  title: "Terms of Use — Glowison",
  description: "Read Glowison's terms and conditions for using our website and purchasing our products.",
};

export default function TermsOfUsePage() {
  return (
    <PolicyLayout title="Terms of Use" lastUpdated="January 1, 2026">

      <p>
        By accessing our website or placing an order with <strong>Glowison</strong> via WhatsApp,
        you agree to be bound by these Terms of Use. Please read them carefully before proceeding.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By using this website or placing an order through our WhatsApp channel, you confirm that
        you are at least <strong>18 years of age</strong> and agree to comply with these terms in
        full. If you do not agree, please do not use our services.
      </p>

      <h2>2. How Orders Work</h2>
      <ul>
        <li>All orders at Glowison are placed and confirmed through our official <strong>WhatsApp number</strong>.</li>
        <li>An order is considered confirmed only after you receive a confirmation message from us on WhatsApp and payment has been received.</li>
        <li>We reserve the right to refuse or cancel any order at our discretion, with a full refund issued where applicable.</li>
        <li>Prices are subject to change. The price confirmed on WhatsApp at the time of order is the binding price for that transaction.</li>
      </ul>

      <h2>3. Products</h2>
      <ul>
        <li>All Glowison products are handcrafted. Minor variations in colour, finish, or texture are natural and expected — they are not defects.</li>
        <li>Product images on our website are for reference only. Actual colours may vary slightly due to screen calibration differences.</li>
        <li>Product availability is subject to stock and is confirmed at the time of WhatsApp order.</li>
      </ul>

      <h2>4. Custom & Personalised Orders</h2>
      <ul>
        <li>Custom orders require written design approval via WhatsApp before production begins.</li>
        <li>Once you approve the design and production has started, the order <strong>cannot be cancelled or refunded</strong>.</li>
        <li>You are solely responsible for verifying all personalisation details — names, spellings, sizes, and colours — before giving approval.</li>
        <li>Glowison is not liable for errors in personalisation details that were approved by the customer.</li>
      </ul>

      <h2>5. Unboxing Video Requirement</h2>
      <p>
        To be eligible for any return, exchange, or damage claim, customers <strong>must record a
        continuous video while opening the package</strong>. This video must clearly show the
        sealed package before opening and the condition of the product upon unboxing.
        Claims made without an unboxing video will not be entertained under any circumstances.
      </p>

      <h2>6. Payments</h2>
      <ul>
        <li>Payments are accepted via UPI, bank transfer, or other methods confirmed during your WhatsApp order.</li>
        <li>Full payment is required before dispatch for all orders, including custom orders.</li>
        <li>We do not store or have access to your banking or card details at any point.</li>
      </ul>

      <h2>7. Intellectual Property</h2>
      <p>
        All content on this website — including logos, product images, designs, text, and
        branding — is the exclusive property of <strong>Glowison</strong>. Reproducing,
        distributing, or using any part of this content without our prior written consent
        is strictly prohibited.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        Glowison shall not be held liable for any indirect, incidental, or consequential damages
        arising from the use of our products or website. In all cases, our maximum liability
        shall not exceed the total value of the order in question.
      </p>

      <h2>9. User Conduct</h2>
      <ul>
        <li>You agree not to misuse our website or WhatsApp channel in any way that could cause harm or disruption.</li>
        <li>You must not submit false, misleading, or defamatory reviews or communications.</li>
        <li>We reserve the right to block or refuse service to anyone who violates these terms.</li>
      </ul>

      <h2>10. Governing Law</h2>
      <p>
        These Terms of Use are governed by the laws of <strong>India</strong>. Any disputes
        arising from the use of our website or WhatsApp ordering process shall be subject to the
        exclusive jurisdiction of the courts in <strong>Surat, Gujarat</strong>.
      </p>

      <h2>11. Changes to These Terms</h2>
      <p>
        We reserve the right to update these Terms of Use at any time. Changes are effective
        immediately upon being posted to this page. Continued use of our website or WhatsApp
        ordering service after changes are posted constitutes your acceptance of the revised terms.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions about these terms, please reach out to us directly on
        <strong> WhatsApp</strong> or through our contact page. We're here to help.
      </p>

    </PolicyLayout>
  );
}
