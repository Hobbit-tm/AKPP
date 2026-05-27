import React from "react";
import SectionTitle from "./SectionTitle";
import InfoCard from "./InfoCard";
import { processSteps } from "../data/siteData";

export default function Steps() {
  return (
    <section
      id="steps"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <SectionTitle eyebrow="Этапы" title="Понятный процесс без лишней воды" />
      <div className="mt-10 grid gap-6 lg:grid-cols-4">
        {processSteps.map((step, idx) => (
          <InfoCard key={step.title} className="p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-lg font-black text-white">
              {idx + 1}
            </div>
            <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
          </InfoCard>
        ))}
      </div>
    </section>
  );
}
