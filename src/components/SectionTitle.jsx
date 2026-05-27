import React from "react";

export default function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold tracking-[0.2em] text-orange-500 uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{text}</p>
    </div>
  );
}
