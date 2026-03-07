import PolicyLayout from "@/app/components/PolicyLayout";

export const metadata = {
  title: "Privacy Policy — Glowison",
  description: "Read Glowison's privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="January 1, 2026">

      <p>
        At <strong>Glowison</strong>, your privacy matters deeply to us. This Privacy Policy explains
        how we collect, use, and protect your information when you browse our website or place an
        order through <strong>WhatsApp</strong>.
      </p>

      <h2>1. Information We Collect</h2>
      <p>When you interact with us, we may collect the following:</p>
      <ul>
        <li><strong>Personal Information:</strong> Your name, WhatsApp number, email address, and delivery address — shared when you place an order.</li>
        <li><strong>Order Details:</strong> Product preferences, custom order specifications, and any personalisation details you provide over WhatsApp.</li>
        <li><strong>Payment Information:</strong> We do not store any payment details. Payments are made directly via UPI, bank transfer, or other trusted methods, and we never have access to your card or banking credentials.</li>
        <li><strong>Usage Data:</strong> General browsing data such as pages visited, device type, and referring URLs collected via analytics tools to help us improve our website.</li>
        <li><strong>Communication Data:</strong> Messages and media exchanged with us on WhatsApp or via our contact form.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To confirm, process, and fulfil your orders via WhatsApp.</li>
        <li>To send order updates, dispatch notifications, and tracking details.</li>
        <li>To communicate about custom order approvals and personalisation details.</li>
        <li>To send promotional offers or new arrivals on WhatsApp — only if you have opted in.</li>
        <li>To improve our products, website experience, and customer service.</li>
        <li>To comply with applicable legal requirements.</li>
      </ul>

      <h2>3. WhatsApp Communication</h2>
      <p>
        Since all orders are placed and managed through WhatsApp, your WhatsApp number is our
        primary means of communication. We will only contact you regarding your orders,
        personalisation approvals, or updates you have requested. We will never share your
        WhatsApp number with third parties for marketing purposes.
      </p>

      <h2>4. Sharing Your Information</h2>
      <p>
        We do <strong>not</strong> sell, trade, or rent your personal data to any third party.
        Your information may be shared only with trusted logistics and courier partners solely to
        deliver your order. These partners are bound by their own privacy obligations.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Our website may use cookies to improve your browsing experience and analyse site traffic.
        You can disable cookies in your browser settings, though some features of the site
        may not function as intended.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We take reasonable steps to protect your personal information from unauthorised access
        or disclosure. However, no internet transmission is completely secure, and we encourage
        you to avoid sharing sensitive details unnecessarily over any channel.
      </p>

      <h2>7. Your Rights</h2>
      <ul>
        <li>Request a copy of the personal data we hold about you.</li>
        <li>Ask us to correct or delete your personal information.</li>
        <li>Opt out of WhatsApp marketing messages at any time by simply messaging us "STOP".</li>
      </ul>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may revise this Privacy Policy periodically. Any updates will be posted on this page
        with a revised date. Continued use of our website or WhatsApp ordering service after
        changes are posted constitutes your acceptance of the updated policy.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        For any privacy-related queries, please reach out to us directly on WhatsApp or via our
        contact page. We're happy to assist.
      </p>

    </PolicyLayout>
  );
}