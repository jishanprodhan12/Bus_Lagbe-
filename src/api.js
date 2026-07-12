const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchBookings() {
  const res = await fetch(`${API_BASE}/bookings`);
  if (!res.ok) throw new Error('Failed to fetch bookings');
  const data = await res.json();
  return data.data;
}

export async function saveBookingToServer(booking) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });
  if (!res.ok) throw new Error('Failed to save booking');
  const data = await res.json();
  return data.data;
}
