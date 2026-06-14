import { Helmet } from "react-helmet-async";
import Header from "./Header";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

export default function ServicePageTemplate({
  title,
  description,
  h1,
  intro,
  symptoms,
  children,
}) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <Header />

      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-black text-slate-900">{h1}</h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
            {intro}
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Когда нужна услуга
          </h2>

          <ul className="mt-6 space-y-3 text-lg text-slate-600">
            {symptoms.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10">
          <h2 className="text-3xl font-bold text-slate-900">
            Какие автомобили обслуживаем
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Работаем с Toyota, Lexus, Hyundai, Kia, Volkswagen, Audi, Skoda,
            BMW, Mercedes-Benz и другими марками.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-orange-500 p-10 text-center text-white">
          <h2 className="text-3xl font-black">Нужна консультация?</h2>

          <a
            href="tel:+77718721040"
            className="mt-6 inline-block rounded-full bg-white px-8 py-4 font-bold text-orange-500"
          >
            Позвонить мастеру
          </a>
        </div>
        {children}
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
