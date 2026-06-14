import ServicePageTemplate from "../components/ServicePageTemplate";
import { Link } from "react-router-dom";

export default function ZamenaMaslaAKPP() {
  return (
    <ServicePageTemplate
      title="Замена масла АКПП в Алматы"
      description="Полная и частичная замена масла АКПП в Алматы."
      h1="Замена масла АКПП в Алматы"
      intro="Выполняем частичную и полную замену масла в автоматических коробках передач."
      symptoms={[
        "Пробег более 60 000 км",
        "Рывки при переключении",
        "Потемнение масла",
        "Перегрев коробки",
        "Профилактическое обслуживание",
      ]}
    >
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">Зачем нужна замена масла АКПП</h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Трансмиссионное масло выполняет сразу несколько функций: смазывает
          детали, охлаждает коробку передач и обеспечивает корректную работу
          гидравлической системы. Со временем масло теряет свои свойства и
          требует замены.
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Регулярная замена масла позволяет увеличить срок службы автоматической
          коробки передач и избежать дорогостоящего ремонта.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">
          Когда необходимо менять масло АКПП
        </h2>

        <ul className="mt-6 space-y-4 text-lg text-slate-600">
          <li>✓ Каждые 40–60 тысяч километров пробега</li>
          <li>✓ После покупки автомобиля с пробегом</li>
          <li>✓ При потемнении масла</li>
          <li>✓ При появлении запаха гари</li>
          <li>✓ При рывках и задержках переключения передач</li>
        </ul>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">Полная и частичная замена масла</h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Частичная замена позволяет обновить часть объёма масла и подходит для
          регулярного обслуживания автомобиля.
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Полная аппаратная замена обеспечивает практически полное обновление
          трансмиссионной жидкости и рекомендуется при большом пробеге либо
          после ремонта коробки передач.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">Часто задаваемые вопросы</h2>

        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold">Как часто менять масло АКПП?</h3>

            <p className="mt-2 text-slate-600">
              В среднем каждые 40–60 тысяч километров пробега.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">Какое масло используется?</h3>

            <p className="mt-2 text-slate-600">
              Используем жидкости, рекомендованные производителем автомобиля.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">Другие услуги</h2>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/diagnostika-akpp"
            className="rounded-full bg-slate-100 px-5 py-3 hover:bg-orange-100"
          >
            Диагностика АКПП
          </Link>

          <Link
            to="/remont-dsg"
            className="rounded-full bg-slate-100 px-5 py-3 hover:bg-orange-100"
          >
            Ремонт DSG
          </Link>

          <Link
            to="/remont-cvt"
            className="rounded-full bg-slate-100 px-5 py-3 hover:bg-orange-100"
          >
            Ремонт вариаторов CVT
          </Link>
        </div>
      </div>
    </ServicePageTemplate>
  );
}
