import React from "react";
import SectionTitle from "./SectionTitle";
import InfoCard from "./InfoCard";
import { prices } from "../data/siteData";

export default function Prices() {
  return (
    <section id="prices" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Цены"
          title="Прозрачный прайс для основных работ"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {prices.map((item) => (
            <InfoCard key={item.name} className="bg-slate-50 p-6 shadow-none">
              <p className="text-sm text-slate-500">{item.name}</p>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {item.price}
              </p>
            </InfoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
