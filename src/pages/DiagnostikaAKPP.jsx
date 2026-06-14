import { Helmet } from "react-helmet-async";

import Header from "../components/Header";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function DiagnostikaAKPP() {
  return (
    <>
      <Helmet>
        <title>Диагностика АКПП в Алматы | Проверка коробки автомат</title>

        <meta
          name="description"
          content="Диагностика АКПП в Алматы. Компьютерная диагностика, проверка гидроблока, считывание ошибок и определение неисправностей автоматических коробок передач."
        />
      </Helmet>

      <Header />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
            Услуга
          </span>

          <h1 className="mt-4 text-5xl font-black text-slate-900">
            Диагностика АКПП в Алматы
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            Выполняем компьютерную диагностику автоматических коробок передач,
            DSG и вариаторов CVT. Определяем причины рывков, пробуксовок, ошибок
            и некорректной работы трансмиссии.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Компьютерная диагностика
            </h3>

            <p className="mt-4 text-slate-600">
              Считываем ошибки и анализируем работу электронных систем коробки.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Проверка гидроблока
            </h3>

            <p className="mt-4 text-slate-600">
              Проверяем давление и работу гидравлической части АКПП.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">
              Рекомендации по ремонту
            </h3>

            <p className="mt-4 text-slate-600">
              После диагностики объясняем причину неисправности и предлагаем
              варианты решения.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
