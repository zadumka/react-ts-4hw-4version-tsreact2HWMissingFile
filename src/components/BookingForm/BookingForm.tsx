import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import type { Room } from "@/types/room";
import { createBooking } from "@/services/bookingService";
import styles from "./BookingForm.module.css";

const bookingSchema = z.object({
  roomId: z.string().min(1, { error: "Select a room" }),
  name: z
    .string()
    .trim()
    .min(2, { error: "At least 2 characters" })
    .max(50, { error: "Up to 50 characters" }),
  phone: z
    .string()
    .regex(/^\+380\d{9}$/, { error: "Use the format +380XXXXXXXXX" }),
  email: z.email({ error: "Enter a valid email" }).or(z.literal("")),
  date: z
    .string()
    .min(1, { error: "Select a date" })
    .refine((date) => date >= new Date().toLocaleDateString("en-CA"), {
      error: "This date is in the past",
    }),
  guests: z.coerce.number().min(1, { error: "At least 1 guest" }),
  mealPlan: z.string().min(1, { error: "Choose a meal plan" }),
  extras: z.array(z.string()),
  comment: z.string().trim().max(200, { error: "Up to 200 characters" }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

type BookingFormProps = {
  rooms: Room[];
};

export function BookingForm({ rooms }: BookingFormProps) {
  "use no memo";
  const fieldId = useId();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      roomId: "",
      name: "",
      phone: "",
      email: "",
      date: "",
      guests: 1,
      mealPlan: "",
      extras: [],
      comment: "",
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handleFormSubmit = async (values: BookingFormValues) => {
    try {
      const booking = await createBooking(values);
      toast.success(`Booking created: ${booking.name}, ${booking.date}`);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Try again.",
      });
    }
  };

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${fieldId}-room`}>
          Room
        </label>
        <select
          className={styles.input}
          id={`${fieldId}-room`}
          {...register("roomId")}
        >
          <option value="">Select a room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name} · up to {room.capacity} guests
            </option>
          ))}
        </select>
        {errors.roomId && (
          <p className={styles.error}>{errors.roomId.message}</p>
        )}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${fieldId}-name`}>
            Guest name
          </label>
          <input
            className={styles.input}
            type="text"
            id={`${fieldId}-name`}
            {...register("name")}
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${fieldId}-phone`}>
            Phone
          </label>
          <input
            className={styles.input}
            type="tel"
            id={`${fieldId}-phone`}
            placeholder="+380671234567"
            {...register("phone")}
          />
          {errors.phone && (
            <p className={styles.error}>{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${fieldId}-email`}>
          Email (optional)
        </label>
        <input
          className={styles.input}
          type="email"
          id={`${fieldId}-email`}
          {...register("email")}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${fieldId}-date`}>
            Check-in date
          </label>
          <input
            className={styles.input}
            type="date"
            id={`${fieldId}-date`}
            {...register("date")}
          />
          {errors.date && <p className={styles.error}>{errors.date.message}</p>}
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor={`${fieldId}-guests`}>
            Guests
          </label>
          <input
            className={styles.input}
            type="number"
            id={`${fieldId}-guests`}
            {...register("guests")}
          />
          {errors.guests && (
            <p className={styles.error}>{errors.guests.message}</p>
          )}
        </div>
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.label}>Meal plan</legend>
        <div className={styles.options}>
          <label className={styles.option}>
            <input type="radio" value="room-only" {...register("mealPlan")} />
            Room only
          </label>
          <label className={styles.option}>
            <input type="radio" value="breakfast" {...register("mealPlan")} />
            Breakfast
          </label>
          <label className={styles.option}>
            <input
              type="radio"
              value="breakfast-dinner"
              {...register("mealPlan")}
            />
            Breakfast and dinner
          </label>
        </div>
        {errors.mealPlan && (
          <p className={styles.error}>{errors.mealPlan.message}</p>
        )}
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.label}>Extras (optional)</legend>
        <div className={styles.options}>
          <label className={styles.option}>
            <input type="checkbox" value="parking" {...register("extras")} />
            Parking
          </label>
          <label className={styles.option}>
            <input type="checkbox" value="baby-cot" {...register("extras")} />
            Baby cot
          </label>
          <label className={styles.option}>
            <input
              type="checkbox"
              value="late-check-in"
              {...register("extras")}
            />
            Late check-in
          </label>
        </div>
      </fieldset>

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${fieldId}-comment`}>
          Comment (optional)
        </label>
        <textarea
          className={styles.textarea}
          id={`${fieldId}-comment`}
          {...register("comment")}
        />
        {errors.comment && (
          <p className={styles.error}>{errors.comment.message}</p>
        )}
      </div>

      {errors.root && <p className={styles.formError}>{errors.root.message}</p>}

      <button className={styles.button} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Booking..." : "Book"}
      </button>
    </form>
  );
}
