import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingButtons() {
  const phoneNumber = "77718721040"; // без "+"
  const whatsappMessage = "Здравствуйте! Хочу узнать подробнее о ремонте АКПП.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;
  const phoneLink = `tel:${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-200 hover:scale-110 animate-pulse"
        aria-label="Написать в WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
      </a>

      <a
        href={phoneLink}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-200 hover:scale-110 animate-pulse"
        aria-label="Позвонить"
      >
        <FaPhoneAlt className="text-2xl" />
      </a>
    </div>
  );
}
