import React from "react";
import SectionTitle from "./SectionTitle";
import InfoCard from "./InfoCard";
import { CheckCircle2 } from "lucide-react";
import { advantages } from "../data/siteData";

export default function Advantages() {
  return (
    <section id="advantages" className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionTitle
            eyebrow="Преимущества"
            title="Почему клиенты выбирают этот сервис"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {advantages.map((item) => (
              <InfoCard
                key={item}
                className="flex items-start gap-3 bg-slate-50 p-4 shadow-none"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-orange-500" />
                <p className="font-medium text-slate-700">{item}</p>
              </InfoCard>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300">
            Что входит в работу
          </p>
          <div className="mt-6 space-y-4">
            {[
              "Компьютерная диагностика и проверка ошибок",
              "Снятие и разбор коробки передач",
              "Проверка гидроблока, соленоидов и насоса",
              "Замена изношенных деталей и ATF",
              "Сборка, адаптация и тест-драйв",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="rounded-full bg-orange-500 p-1.5 text-white">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
