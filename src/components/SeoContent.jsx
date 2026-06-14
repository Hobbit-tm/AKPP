import { Link } from "react-router-dom";

<Link to="/diagnostika-akpp" className="text-orange-500 font-semibold">
  Подробнее о диагностике →
</Link>;

export default function SeoContent() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
          О сервисе
        </span>

        <h2 className="mt-4 text-4xl font-black text-slate-900">
          Ремонт АКПП, DSG и вариаторов CVT в Алматы
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">
          Профессиональная диагностика и ремонт автоматических коробок передач
          для легковых автомобилей и кроссоверов.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Диагностика АКПП</h3>

          <p className="mt-4 leading-7 text-slate-600">
            Выполняем компьютерную диагностику, проверку давления, считывание
            ошибок и анализ состояния коробки передач.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">Ремонт DSG и CVT</h3>

          <p className="mt-4 leading-7 text-slate-600">
            Ремонтируем мехатроники, гидроблоки, сцепления DSG и вариаторы CVT
            различных производителей.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900">
            Замена масла АКПП
          </h3>

          <p className="mt-4 leading-7 text-slate-600">
            Полная и частичная замена масла с использованием качественных
            расходных материалов.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-lg leading-8 text-slate-600">
          Наш сервис выполняет ремонт АКПП в Алматы для автомобилей Toyota,
          Lexus, Hyundai, Kia, Volkswagen, Audi, BMW, Mercedes-Benz и других
          марок. Проводим диагностику коробок передач, замену масла, ремонт DSG
          и вариаторов CVT. Если появились рывки, пробуксовка, пинки при
          переключении передач или ошибки на панели приборов, рекомендуем пройти
          диагностику как можно раньше.
        </p>
      </div>
    </section>
  );
}
