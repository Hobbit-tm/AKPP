import ServicePageTemplate from "../components/ServicePageTemplate";
import { Link } from "react-router-dom";

export default function RemontCVT() {
  return (
    <ServicePageTemplate
      title="Ремонт вариаторов CVT в Алматы"
      description="Ремонт вариаторов CVT в Алматы. Диагностика и восстановление вариаторных трансмиссий."
      h1="Ремонт вариаторов CVT в Алматы"
      intro="Обслуживаем и ремонтируем вариаторы японских и корейских автомобилей."
      symptoms={[
        "Пробуксовка",
        "Потеря тяги",
        "Шумы вариатора",
        "Вибрация",
        "Ошибки трансмиссии",
      ]}
    >
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">
          Особенности ремонта вариаторов CVT
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Вариатор CVT отличается от классической автоматической коробки передач
          принципом работы. Передача крутящего момента осуществляется через
          ремень или цепь между конусными шкивами, что обеспечивает плавное
          ускорение без переключения передач.
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Несмотря на высокий уровень комфорта, вариаторы требуют своевременного
          обслуживания. Несвоевременная замена масла и эксплуатация с
          неисправностями могут привести к дорогостоящему ремонту трансмиссии.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">
          Признаки неисправности вариатора
        </h2>

        <ul className="mt-6 space-y-4 text-lg text-slate-600">
          <li>✓ Потеря тяги при разгоне</li>
          <li>✓ Пробуксовка ремня</li>
          <li>✓ Посторонний шум вариатора</li>
          <li>✓ Вибрация автомобиля</li>
          <li>✓ Ошибки трансмиссии</li>
          <li>✓ Перегрев коробки передач</li>
        </ul>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">Как проходит ремонт вариатора</h2>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          Ремонт начинается с компьютерной диагностики и проверки параметров
          работы вариатора. После определения неисправности выполняется разборка
          агрегата, дефектовка деталей и составляется перечень необходимых
          работ.
        </p>

        <p className="mt-6 text-lg leading-8 text-slate-600">
          В зависимости от состояния трансмиссии производится замена ремня,
          подшипников, клапанов гидроблока, насосов и других элементов
          вариатора. После ремонта коробка проходит адаптацию и тестирование.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
        <h2 className="text-3xl font-black">Часто задаваемые вопросы</h2>

        <div className="mt-8 space-y-8">
          <div>
            <h3 className="text-xl font-bold">
              Сколько стоит ремонт вариатора?
            </h3>

            <p className="mt-2 text-slate-600">
              Стоимость определяется после диагностики и зависит от характера
              неисправности.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold">
              Можно ли ездить с неисправным вариатором?
            </h3>

            <p className="mt-2 text-slate-600">
              Не рекомендуется. Продолжительная эксплуатация может привести к
              серьёзным повреждениям трансмиссии.
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
            to="/zamena-masla-akpp"
            className="rounded-full bg-slate-100 px-5 py-3 hover:bg-orange-100"
          >
            Замена масла АКПП
          </Link>
        </div>
      </div>
    </ServicePageTemplate>
  );
}
