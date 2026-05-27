export default function WhatsAppButton() {
  const phone = "77718721040"; // Замените на ваш номер телефона в формате без плюса и пробелов
  const text = "Здравствуйте! Хочу узнать подробнее.";

  return (
    <>
      <a
        href={`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="WhatsApp"
      >
        💬
      </a>

      <style>{`
        .whatsapp-btn {
          position: fixed;
          right: 25px;
          bottom: 25px;
          width: 70px;
          height: 70px;
          background: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 9999;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
          transition: 0.3s;
          text-decoration: none;
          font-size: 32px;
        }

        .whatsapp-btn:hover {
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}
