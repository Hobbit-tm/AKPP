import React, { useState } from "react";
import { ArrowRight, MapPin, PhoneCall } from "lucide-react";

const WHATSAPP_NUMBER = "+77718721040"; // без +, пробелов и скобок

const initialForm = {
  name: "",
  phone: "",
  car: "",
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = [
      "Здравствуйте! Хочу оставить заявку на ремонт АКПП.",
      `Имя: ${form.name}`,
      `Телефон: ${form.phone}`,
      `Авто: ${form.car}`,
      `Сообщение: ${form.message}`,
    ].join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setForm(initialForm);
  };

  return (
    <section id="contacts" className="pb-20">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
            Контакты
          </p>
          <h2 className="mt-3 text-3xl font-black">
            Запишитесь на диагностику уже сегодня
          </h2>
          <p className="mt-4 max-w-lg leading-7 text-slate-300">
            Нажмите на кнопку ниже, чтобы сразу перейти к форме заявки и
            оставить контакты.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="tel:+77718721040"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <PhoneCall className="h-5 w-5 text-orange-300" />
              <span>+7 (771) 872 10 40 </span>
            </a>
            <a
              href="#map2gis"
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
            >
              <MapPin className="h-5 w-5 text-orange-300" />
              <span>г. Алматы, ул. Садовый бульвар 1ж</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("map2gis");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
          >
            <MapPin className="h-5 w-5 text-orange-300" />
            <span>г. Алматы, ул. Садовый бульвар 1ж</span>
          </button>
        </div>

        <div
          id="contacts-form"
          className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h3 className="text-2xl font-bold">Форма заявки</h3>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-400"
              placeholder="Ваше имя"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-400"
              placeholder="Телефон"
              required
            />
            <input
              name="car"
              value={form.car}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-400"
              placeholder="Марка и модель авто"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              className="min-h-36 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-orange-400"
              placeholder="Опишите проблему: пинки, пробуксовка, ошибки, перегрев..."
            />
            <button
              type="submit"
              className="w-full rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Отправить заявку в WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
