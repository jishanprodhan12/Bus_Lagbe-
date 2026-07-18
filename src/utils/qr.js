import QRCode from "qrcode";

export const generateTicketQrPayload = (booking) => {
  const bookingId = booking?.bookingId || "UNKNOWN";

  // Change this to your production domain later
  const ticketUrl = `https://buslagbe.surge.sh/`;

  return `🚌 BusLagbe? E-Ticket

Passenger: ${booking?.passenger?.name || "Guest"}

Phone: ${booking?.passenger?.phone || "N/A"}

Booking ID: ${bookingId}

Transaction ID: ${booking?.transactionId || "Pending"}

Journey Date: ${booking?.journeyDate || "N/A"}

From: ${booking?.boardingPoint || "N/A"}

To: ${booking?.droppingPoint || "N/A"}

Seat(s): ${(booking?.seats || []).join(", ") || "N/A"}

Amount: ৳${booking?.amount || 0}

Payment Status: ${booking?.paymentStatus || "Pending"}

━━━━━━━━━━━━━━━━━━━━━━

Vist our website :
${ticketUrl}

Thank you for choosing BusLagbe ❤️`;
};

export const createQrDataUrl = async (value, options = {}) => {
  return await QRCode.toDataURL(value, {
    errorCorrectionLevel: "H",
    margin: 2,
    width: 240,
    color: {
      dark: "#0F172A",
      light: "#FFFFFF",
    },
    ...options,
  });
};