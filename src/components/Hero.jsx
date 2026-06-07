import React from "react";
import { ArrowRight, BadgeCheck, Clock3, PhoneCall } from "lucide-react";
import InfoCard from "./InfoCard";
import { stats } from "../data/siteData";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.14),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.08),_transparent_28%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
            <BadgeCheck className="h-4 w-4" />
            Диагностика, ремонт и обслуживание АКПП
          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Ремонт АКПП, DSG и вариаторов CVT в Алматы
          </h1>

          <p className="mt-6 max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Диагностика АКПП, замена масла, ремонт DSG и CVT, восстановление
            гидроблоков и мехатроников с гарантией.
          </p>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Проводим точную диагностику, объясняем причину поломки и
            восстанавливаем коробку с гарантией. Подходит для легковых авто,
            кроссоверов и коммерческого транспорта.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacts"
              onClick={(e) => {
                e.preventDefault();

                document.getElementById("contacts")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
            >
              Получить консультацию <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+7771 872 10 40"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-white"
            >
              <PhoneCall className="h-4 w-4" />
              Позвонить мастеру
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((item) => (
              <InfoCard key={item.value} className="p-4">
                <div className="text-2xl font-extrabold text-slate-900">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{item.label}</div>
              </InfoCard>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-orange-200/60 blur-3xl" />
          <div className="absolute -right-4 bottom-10 h-32 w-32 rounded-full bg-slate-300/50 blur-3xl" />

          <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="rounded-[1.6rem] bg-slate-950 p-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">Экспресс-диагностика</p>
                  <h3 className="mt-1 text-2xl font-bold">
                    АКПП сегодня в порядке?
                  </h3>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <Clock3 className="h-6 w-6" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Пинки при переключении", "Проверка гидроблока"],
                  ["Пробуксовка", "Диагностика фрикционов"],
                  ["Рывки на ходу", "Считывание ошибок"],
                  ["Перегрев", "Проверка ATF"],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm text-slate-300">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard className="bg-slate-50 p-4 shadow-none">
                <p className="text-sm text-slate-500">Время работы</p>
                <p className="mt-2 text-lg font-bold">Пн–Сб: 10:00–18:00</p>
              </InfoCard>
              <InfoCard className="bg-slate-50 p-4 shadow-none">
                <p className="text-sm text-slate-500">Адрес сервиса</p>

                <a
                  href="https://2gis.kz/almaty?m=76.839419%2C43.198872%2F17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center gap-2 text-lg font-bold text-slate-900 transition hover:text-orange-500"
                >
                  📍 г. Алматы, ул. Садовый бульвар 1ж
                </a>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
