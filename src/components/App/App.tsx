import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import type { Room } from "@/types/room";
import { fetchRooms } from "@/services/bookingService";
import { BookingForm } from "@/components/BookingForm/BookingForm";
import styles from "./App.module.css";

export function App() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch {
        setIsError(true);
      }
    };

    loadRooms();
  }, []);

  return (
    <>
      <main className={styles.page}>
        <h1 className={styles.title}>Guest House Admin</h1>
        <section className={styles.panel}>
          <h2 className={styles.heading}>New booking</h2>
          {isError && (
            <p className={styles.message}>
              Could not load rooms. Please reload the page.
            </p>
          )}
          <BookingForm rooms={rooms} />
        </section>
      </main>
      <Toaster />
    </>
  );
}
