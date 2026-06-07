import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    question: "Сколько стоит диагностика АКПП?",
    answer:
      "Стоимость зависит от модели автомобиля и типа диагностики. Свяжитесь с нами для уточнения цены.",
  },
  {
    question: "Сколько занимает ремонт АКПП?",
    answer:
      "В среднем ремонт занимает от 1 до 5 дней в зависимости от сложности неисправности.",
  },
  {
    question: "Предоставляете ли вы гарантию?",
    answer: "Да, на все выполненные работы предоставляется гарантия.",
  },
  {
    question: "Можно ли приехать без записи?",
    answer:
      "Да, но для оперативного обслуживания рекомендуем предварительно записаться.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <span className="rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
          FAQ
        </span>

        <h2 className="mt-4 text-4xl font-black text-slate-900">
          Часто задаваемые вопросы
        </h2>

        <p className="mt-4 text-lg text-slate-600">
          Ответы на популярные вопросы по ремонту АКПП, DSG и вариаторов.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left"
            >
              <span className="text-lg font-bold text-slate-900">
                {item.question}
              </span>

              <ChevronDown
                className={`h-5 w-5 transition ${
                  open === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {open === index && (
              <div className="border-t border-slate-100 px-6 py-5 text-slate-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
