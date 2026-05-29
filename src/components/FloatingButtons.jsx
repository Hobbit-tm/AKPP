import React, { useState } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);

  const phoneNumber = "77718721040";
  const whatsappMessage = "Здравствуйте! Хочу узнать подробнее о ремонте АКПП.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;
  const phoneLink = `tel:${phoneNumber}`;
  const routeLink = "https://2gis.kz/almaty?m=76.839419%2C43.198872%2F17";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 translate-y-4"
        }`}
      >
        <a
          href={routeLink}
          target="_blank"
          rel="noreferrer"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg transition-transform duration-200 hover:scale-110 animate-pulse"
          aria-label="Построить маршрут"
        >
          <FaMapMarkerAlt className="text-2xl" />
        </a>

        <a
          href={phoneLink}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-200 hover:scale-110 animate-pulse"
          aria-label="Позвонить"
        >
          <FaPhoneAlt className="text-2xl" />
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-200 hover:scale-110 animate-pulse"
          aria-label="Написать в WhatsApp"
        >
          <FaWhatsapp className="text-3xl" />
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label={open ? "Скрыть кнопки" : "Открыть кнопки"}
      >
        {open ? (
          <FaTimes className="text-2xl" />
        ) : (
          <FaPhoneAlt className="text-2xl" />
        )}
      </button>
    </div>
  );
}
