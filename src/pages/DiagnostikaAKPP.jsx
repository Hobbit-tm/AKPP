import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

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
          content="Профессиональная диагностика АКПП в Алматы. Проверка DSG, CVT и автоматических коробок передач."
        />
      </Helmet>

      <Header />

      <main className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-black text-slate-900">
            Диагностика АКПП в Алматы
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            Компьютерная диагностика автоматических коробок передач, DSG и
            вариаторов CVT.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-bold">Компьютерная диагностика</h3>

            <p className="mt-4 text-slate-600">
              Считывание ошибок и анализ параметров работы АКПП.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-bold">Проверка давления</h3>

            <p className="mt-4 text-slate-600">
              Контроль состояния гидросистемы коробки передач.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h3 className="text-2xl font-bold">Точная оценка</h3>

            <p className="mt-4 text-slate-600">
              Помогаем определить причину неисправности.
            </p>
          </div>
        </div>

        <div className="mt-20 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black text-slate-900">
            Когда необходима диагностика АКПП
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Диагностика АКПП позволяет выявить неисправности автоматической
            коробки передач на ранней стадии и избежать дорогостоящего ремонта.
            Рекомендуется обратиться в сервис при появлении пинков, рывков,
            пробуксовки, ошибок на панели приборов или перегрева коробки
            передач. Мы выполняем комплексную проверку DSG, CVT и классических
            автоматических коробок передач.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black text-slate-900">
            Что входит в диагностику АКПП
          </h2>

          <ul className="mt-6 space-y-4 text-lg text-slate-600">
            <li>✓ Компьютерное считывание ошибок</li>
            <li>✓ Проверка давления масла</li>
            <li>✓ Анализ параметров коробки передач</li>
            <li>✓ Проверка состояния ATF</li>
            <li>✓ Тестирование автомобиля</li>
          </ul>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black text-slate-900">
            Какие неисправности позволяет выявить диагностика
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Во время диагностики специалисты могут определить неисправности
            гидроблока, соленоидов, мехатроника, сцепления DSG, датчиков и
            других компонентов автоматической коробки передач. Своевременная
            диагностика позволяет предотвратить дорогостоящий капитальный ремонт
            и продлить срок службы трансмиссии.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black">
            С какими автомобилями мы работаем
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Toyota",
              "Lexus",
              "Hyundai",
              "Kia",
              "Volkswagen",
              "Audi",
              "Skoda",
              "BMW",
              "Mercedes-Benz",
              "Nissan",
              "Honda",
              "Mitsubishi",
            ].map((brand) => (
              <span key={brand} className="rounded-full bg-slate-100 px-4 py-2">
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black text-slate-900">
            Профессиональная диагностика АКПП в Алматы
          </h2>

          <div className="mt-6 space-y-6 text-lg leading-8 text-slate-600">
            <p>
              Диагностика АКПП является первым и самым важным этапом перед
              ремонтом автоматической коробки передач. Современные трансмиссии
              DSG, CVT и классические автоматы содержат большое количество
              электронных и гидравлических компонентов.
            </p>

            <p>
              Наш сервис выполняет диагностику АКПП в Алматы для автомобилей
              Toyota, Lexus, Hyundai, Kia, Volkswagen, Audi, BMW, Mercedes-Benz,
              Nissan, Mitsubishi, Honda и других марок.
            </p>

            <p>
              Во время проверки специалисты анализируют работу соленоидов,
              гидроблока, мехатроника, сцепления DSG, давление масла и состояние
              трансмиссионной жидкости.
            </p>

            <p>
              Своевременная диагностика помогает выявить неисправность на ранней
              стадии и избежать дорогостоящего ремонта коробки передач.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black text-slate-900">
            Часто задаваемые вопросы
          </h2>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold">
                Сколько занимает диагностика АКПП?
              </h3>

              <p className="mt-2 text-slate-600">
                Обычно процедура занимает от 30 минут до 1 часа.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">
                Можно ли определить неисправность без разборки?
              </h3>

              <p className="mt-2 text-slate-600">
                Во многих случаях компьютерная диагностика позволяет определить
                причину неисправности без демонтажа коробки передач.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold">
                Проверяете ли вы DSG и вариаторы CVT?
              </h3>

              <p className="mt-2 text-slate-600">
                Да, выполняем диагностику DSG, CVT и классических автоматических
                коробок передач.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-black">Другие услуги</h2>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              to="/remont-dsg"
              className="rounded-full bg-slate-100 px-5 py-3 transition hover:bg-orange-100"
            >
              Ремонт DSG
            </Link>

            <Link
              to="/remont-cvt"
              className="rounded-full bg-slate-100 px-5 py-3 transition hover:bg-orange-100"
            >
              Ремонт вариаторов CVT
            </Link>

            <Link
              to="/zamena-masla-akpp"
              className="rounded-full bg-slate-100 px-5 py-3 transition hover:bg-orange-100"
            >
              Замена масла АКПП
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-orange-500 p-10 text-center text-white">
          <h2 className="text-4xl font-black">
            Запишитесь на диагностику АКПП
          </h2>

          <p className="mt-4 text-lg">
            Если появились рывки, удары или ошибки коробки передач, не
            откладывайте проверку.
          </p>

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
