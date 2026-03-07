import PolicyLayout from "@/app/components/PolicyLayout";

export const metadata = {
  title: "Shipping Policy — Glowison",
  description: "Learn about Glowison's shipping times, delivery partners, packaging, and return policy.",
};

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="January 1, 2026">

      <p>
        At <strong>Glowison</strong>, every order is packed with care before it leaves our hands.
        All orders are placed and confirmed via <strong>WhatsApp</strong>. Please read this policy
        carefully so you know exactly what to expect after ordering.
      </p>

      <h2>1. How to Place an Order</h2>
      <p>
        All orders are placed directly through our <strong>WhatsApp</strong> number. Once you
        message us with your chosen product(s), we will confirm availability, share the final
        price including shipping, and guide you through payment. Your order goes into processing
        only after payment is confirmed.
      </p>

      <h2>2. Processing Time</h2>
      <ul>
        <li><strong>Standard Products:</strong> Processed and dispatched within 2–3 business days of payment confirmation.</li>
        <li><strong>Custom / Personalised Orders:</strong> Require 4–7 business days after design approval is confirmed on WhatsApp.</li>
        <li>Orders confirmed on weekends or public holidays are processed from the next business day.</li>
      </ul>

      <h2>3. Delivery Time</h2>
      <ul>
        <li><strong>Within India:</strong> 5–7 business days after dispatch.</li>
        <li><strong>Express Delivery:</strong> 2–3 business days after dispatch (available on request, ₹99 extra).</li>
        <li>Deliveries to remote or rural pin codes may take additional time depending on courier coverage.</li>
      </ul>

      <h2>4. Shipping Charges</h2>
      <ul>
        <li><strong>Free standard shipping</strong> on all orders above ₹999.</li>
        <li>Orders below ₹999 — flat shipping fee of ₹49.</li>
        <li>Express delivery — flat ₹99, regardless of order value.</li>
      </ul>

      <h2>5. Packaging</h2>
      <p>
        We package every item with care — using protective foam, bubble wrap, and sturdy
        reinforced cardboard. Fragile and wall-mounted items receive double-layer protection
        to ensure they reach you in perfect condition.
      </p>

      <h2>6. Order Tracking</h2>
      <p>
        Once your order is dispatched, we will send you the tracking number and courier
        partner details directly on <strong>WhatsApp</strong>. You can use this to track your
        package on the courier's website or app in real time.
      </p>

      <h2>7. Damaged or Lost Orders</h2>
      <ul>
        <li>If your order arrives damaged, please <strong>record a video while opening the package</strong> and contact us on WhatsApp within <strong>48 hours</strong> of delivery with the video as proof.</li>
        <li>Claims without an unboxing video cannot be processed — please ensure you record this for every order.</li>
        <li>Verified damage claims will be resolved with a replacement or full refund.</li>
        <li>If your order is lost in transit, we will coordinate with the courier and provide a resolution within 7 business days.</li>
      </ul>

      <h2>8. Returns & Exchanges</h2>
      <ul>
        <li>Returns are accepted within <strong>7 days</strong> of delivery for standard products in their original, unused condition.</li>
        <li><strong>A return is only applicable if you have a video recording of the package being opened.</strong> Without an unboxing video, we are unable to process any return or exchange request.</li>
        <li><strong>Custom and personalised orders are strictly non-returnable</strong> unless there is a confirmed manufacturing defect supported by an unboxing video.</li>
        <li>Return shipping costs are the buyer's responsibility unless the return is due to an error on our part.</li>
        <li>To initiate a return, message us on WhatsApp with your order details and unboxing video within the return window.</li>
      </ul>

      <h2>9. Refunds</h2>
      <p>
        Once a return is approved after review of the unboxing video and product condition,
        refunds are processed within <strong>5–7 business days</strong> to your original payment
        method. UPI and bank transfer refunds may take an additional 2–3 business days depending
        on your bank.
      </p>

      <h2>10. International Shipping</h2>
      <p>
        We currently ship <strong>within India only</strong>. International orders are not
        available at this time. We are working on expanding — stay tuned for updates on our
        WhatsApp broadcast!
      </p>

      <h2>11. Contact & Support</h2>
      <p>
        For any shipping queries, order updates, or return requests, please reach out to us
        directly on <strong>WhatsApp</strong>. We typically respond within a few hours on
        business days.
      </p>

    </PolicyLayout>
  );
}
