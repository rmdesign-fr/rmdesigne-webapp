import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import CalendarPicker from "../components/devis/CalendarPicker";
import TimeSlotGrid from "../components/devis/TimeSlotGrid";
import BookingForm from "../components/devis/BookingForm";
import { getAvailableSlots, createBooking } from "../services/bookingService";
import { HiCheckCircle } from "react-icons/hi";

export default function DevisPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setSelectedTime(null);
      try {
        const data = await getAvailableSlots(
          format(selectedDate, "yyyy-MM-dd"),
        );
        setSlots(Array.isArray(data?.slots) ? data.slots : []);
      } catch (err) {
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [selectedDate]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      await createBooking({
        ...formData,
        date: format(selectedDate, "yyyy-MM-dd"),
        time: selectedTime,
      });
      setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rm-dark pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-md"
        >
          <HiCheckCircle className="text-rm-success text-6xl mx-auto mb-4" />
          <h2 className="font-display text-3xl mb-2">Rendez-vous confirmé !</h2>
          <p className="text-rm-muted">
            Nous avons bien reçu votre demande. Un email de confirmation vous a
            été envoyé. Nous vous contacterons rapidement.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-16 relative"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/assets/bg-vertical.png')" }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-6xl tracking-wider mb-2 text-white">
            Réserver une prospection
          </h1>
          <p className="text-white/70 text-lg">
            Choisissez une date et un créneau disponible
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <CalendarPicker
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
          <TimeSlotGrid
            selectedDate={selectedDate}
            slots={slots}
            selectedTime={selectedTime}
            onTimeSelect={setSelectedTime}
            loading={loadingSlots}
          />
        </div>

        <BookingForm
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSubmit={handleSubmit}
          loading={submitting}
        />
      </div>
    </motion.div>
  );
}
