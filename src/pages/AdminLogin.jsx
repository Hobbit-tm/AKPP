import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Ошибка");
        return;
      }

      localStorage.setItem("admin_token", data.token);
      navigate("/admin/panel");
    } catch (error) {
      alert("Не удалось подключиться к серверу");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <form
        onSubmit={login}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Вход в админку</h1>

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-2xl px-5 py-4 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-black text-white rounded-2xl py-4 font-bold"
        >
          Войти
        </button>
      </form>
    </div>
  );
}
