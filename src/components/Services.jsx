import React from "react";
import SectionTitle from "./SectionTitle";
import InfoCard from "./InfoCard";
import { services } from "../data/siteData";

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <SectionTitle
        eyebrow="Услуги"
        title="Все ключевые работы по АКПП в одном месте"
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map(({ icon: Icon, title, text }) => (
          <InfoCard
            key={title}
            className="p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="inline-flex rounded-2xl bg-orange-50 p-3 text-orange-600">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold">{title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{text}</p>
          </InfoCard>
        ))}
      </div>
    </section>
  );
}
