import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Header from "./Header";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export default function BrandPageTemplate({ brand, models }) {
  return (
    <>
      <Helmet>
        <title>Ремонт АКПП {brand} в Алматы</title>

        <meta
          name="description"
          content={`Ремонт АКПП ${brand} в Алматы. Диагностика, обслуживание и ремонт автоматических коробок передач ${brand}.`}
        />
      </Helmet>

      <Header />

      <main className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-black text-slate-900">
            Ремонт АКПП {brand} в Алматы
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            Диагностика, обслуживание и ремонт автоматических коробок передач{" "}
            {brand}.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black">
            Какие модели {brand} обслуживаем
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {models.map((model) => (
              <span key={model} className="rounded-full bg-slate-100 px-4 py-2">
                {model}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black">
            Частые неисправности АКПП {brand}
          </h2>

          <ul className="mt-6 space-y-4 text-lg text-slate-600">
            <li>✓ Рывки при переключении передач</li>
            <li>✓ Пробуксовка коробки передач</li>
            <li>✓ Удары при включении передач</li>
            <li>✓ Перегрев трансмиссии</li>
            <li>✓ Ошибки электронного блока управления</li>
          </ul>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black">Диагностика АКПП {brand}</h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Перед ремонтом проводится компьютерная диагностика, проверка
            параметров коробки передач, давления масла и состояния гидроблока.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black">Почему выбирают наш сервис</h2>

          <ul className="mt-6 space-y-4 text-lg text-slate-600">
            <li>✓ Специализация на ремонте АКПП</li>
            <li>✓ Современное оборудование</li>
            <li>✓ Гарантия на выполненные работы</li>
            <li>✓ Опыт ремонта автомобилей {brand}</li>
          </ul>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black">Другие услуги</h2>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/diagnostika-akpp"
              className="rounded-full bg-slate-100 px-5 py-3"
            >
              Диагностика АКПП
            </Link>

            <Link
              to="/remont-dsg"
              className="rounded-full bg-slate-100 px-5 py-3"
            >
              Ремонт DSG
            </Link>

            <Link
              to="/remont-cvt"
              className="rounded-full bg-slate-100 px-5 py-3"
            >
              Ремонт CVT
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-orange-500 p-10 text-center text-white">
          <h2 className="text-4xl font-black">Нужен ремонт АКПП {brand}?</h2>

          <a
            href="tel:+77718721040"
            className="mt-6 inline-block rounded-full bg-white px-8 py-4 font-bold text-orange-500"
          >
            Позвонить мастеру
          </a>
        </div>
      </main>

      <ContactSection />
      <Footer />
    </>
  );
}
