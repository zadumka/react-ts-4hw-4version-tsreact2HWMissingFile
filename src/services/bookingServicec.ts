import type { Booking } from "@/types/booking";
import type { Room } from "@/types/room";

const apiUrl = import.meta.env.VITE_API_URL;

type ErrorResponse = {
  message?: string;
};

export async function fetchRooms(): Promise<Room[]> {
  const res = await fetch(`${apiUrl}/rooms`);

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data: Room[] = await res.json();
  return data;
}

export async function createBooking(
  booking: Omit<Booking, "id" | "createdAt">,
): Promise<Booking> {
  const res = await fetch(`${apiUrl}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  }).catch(() => {
    throw new Error("No connection to the server. Try again.");
  });

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message ?? "Could not create the booking. Try again.",
    );
  }

  const data: Booking = await res.json();
  return data;
}
