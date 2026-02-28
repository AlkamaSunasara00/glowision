"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function BuyNowSheet({ open, onClose, onConfirm, summary = {} }) {
  // Lock body scroll when sheet is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "flex-end" }}>

      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Sheet */}
      <div style={{
        position: "relative",
        width: "100%",
        background: "white",
        borderRadius: "24px 24px 0 0",
        padding: "24px",
        maxHeight: "70vh",
        overflowY: "auto",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
        animation: "buyNowSlideUp 0.35s cubic-bezier(0.34,1.1,0.64,1) forwards",
      }}>

        {/* Drag handle */}
        <div style={{ width: 48, height: 6, background: "#E5E7EB", borderRadius: 999, margin: "0 auto 24px" }} />

        {/* Close button */}
        <button onClick={onClose} style={{
          position: "absolute", top: 20, right: 20,
          background: "#F3F4F6", border: "none", borderRadius: "50%",
          width: 32, height: 32, display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer",
        }}>
          <X size={16} color="#374151" />
        </button>

        {/* Title */}
        <h3 style={{
          fontFamily: "Playfair Display, serif",
          fontSize: 22, fontWeight: 700,
          color: "var(--color-blue-dark)",
          marginBottom: 16,
        }}>
          Confirm Your Order
        </h3>

        {/* Summary or fallback */}
        {summary.name ? (
          <div style={{ marginBottom: 32, display: "flex", flexDirection: "column", gap: 8, fontSize: 14, color: "#6B7280" }}>
            {summary.name     && <p><strong>Product:</strong>  {summary.name}</p>}
            {summary.color    && <p><strong>Color:</strong>    {summary.color}</p>}
            {summary.size     && <p><strong>Size:</strong>     {summary.size}</p>}
            {summary.quantity && <p><strong>Quantity:</strong> {summary.quantity}</p>}
            {summary.total    && (
              <p style={{ fontSize: 18, fontWeight: 700, color: "var(--color-blue-dark)", marginTop: 8 }}>
                Total: ₹{summary.total.toLocaleString()}
              </p>
            )}
          </div>
        ) : (
          <p style={{ fontSize: 14, color: "#6B7280", marginBottom: 32, lineHeight: 1.6 }}>
            Your order details are ready. Tap <strong style={{ color: "#111" }}>Confirm Order</strong> to
            open WhatsApp with everything pre-filled — just hit Send!
          </p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={onClose} style={{
            flex: 1, height: 48, borderRadius: 12,
            border: "1.5px solid #E5E7EB", background: "white",
            fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>
            Cancel
          </button>
          <button onClick={onConfirm} style={{
            flex: 1, height: 48, borderRadius: 12,
            background: "var(--color-blue-dark)", color: "white",
            border: "none", fontWeight: 600, fontSize: 14, cursor: "pointer",
          }}>
            Confirm Order
          </button>
        </div>
      </div>

      <style>{`
        @keyframes buyNowSlideUp {
          from { transform: translateY(100%); opacity: 0.5; }
          to   { transform: translateY(0);    opacity: 1;   }
        }
      `}</style>
    </div>,
    document.body
  );
}