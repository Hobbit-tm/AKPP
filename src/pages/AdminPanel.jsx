import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
const TOKEN_KEY = "admin_token";

async function apiRequest(path, options = {}, token = "") {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new Error(
      payload?.error || payload?.message || `HTTP ${response.status}`,
    );
  }

  return payload;
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }) {
  const map = {
    approved: "Одобрен",
    pending: "Ожидает",
    rejected: "Отклонён",
  };

  const style = {
    approved: "bg-emerald-100 text-emerald-800",
    pending: "bg-amber-100 text-amber-800",
    rejected: "bg-rose-100 text-rose-800",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${style[status] || "bg-slate-100 text-slate-700"}`}
    >
      {map[status] || status}
    </span>
  );
}

export default function AdminPanel() {
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) || "",
  );
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("all");
  const [replyToId, setReplyToId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const filteredReviews = useMemo(() => {
    if (filter === "all") return reviews;
    return reviews.filter((review) => review.status === filter);
  }, [reviews, filter]);

  const loadReviews = async (currentToken = token) => {
    if (!currentToken) return;
    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/api/admin/reviews", {}, currentToken);
      const list = Array.isArray(data) ? data : data?.reviews || [];
      setReviews(list);
    } catch (err) {
      setError(err.message || "Не удалось загрузить отзывы");
      if (String(err.message || "").includes("401")) {
        localStorage.removeItem(TOKEN_KEY);
        setToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadReviews(token);
  }, [token]);

  const login = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const data = await apiRequest("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (!data?.token) {
        throw new Error("Нет токена");
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setLoginError(err.message || "Не удалось войти");
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setReviews([]);
    setReplyToId(null);
    setReplyText("");
  };

  const updateReview = async (id, action, body = null) => {
    try {
      const path =
        action === "delete"
          ? `/api/reviews/${id}`
          : `/api/reviews/${id}/${action}`;

      await apiRequest(
        path,
        {
          method:
            action === "delete"
              ? "DELETE"
              : action === "helpful"
                ? "POST"
                : "PATCH",
          body: body ? JSON.stringify(body) : undefined,
        },
        token,
      );

      await loadReviews(token);
    } catch (err) {
      setError(err.message || "Не удалось выполнить действие");
    }
  };

  const saveReply = async () => {
    if (!replyToId) return;
    const text = replyText.trim();
    if (!text) return;

    try {
      await apiRequest(
        `/api/reviews/${replyToId}/reply`,
        {
          method: "PATCH",
          body: JSON.stringify({ reply: text }),
        },
        token,
      );
      setReplyToId(null);
      setReplyText("");
      await loadReviews(token);
    } catch (err) {
      setError(err.message || "Не удалось сохранить ответ");
    }
  };

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-black text-slate-950">Админка</h1>
          <p className="mt-2 text-sm text-slate-600">
            Вход для управления отзывами.
          </p>

          <form onSubmit={login} className="mt-6 space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-slate-950"
            />
            {loginError ? (
              <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {loginError}
              </div>
            ) : null}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-2xl bg-slate-950 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              {loginLoading ? "Вход..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">
            Админка отзывов
          </h1>
          <p className="mt-1 text-slate-600">
            Управляй отзывами, ответами и статусами.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => loadReviews(token)}
            className="rounded-2xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700"
          >
            Обновить
          </button>
          <button
            type="button"
            onClick={logout}
            className="rounded-2xl bg-rose-600 px-4 py-2 font-semibold text-white"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              filter === item
                ? "bg-slate-950 text-white"
                : "border border-slate-300 bg-white text-slate-700"
            }`}
          >
            {item === "all" ? "Все" : item}
          </button>
        ))}
      </div>

      {error ? (
        <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="mt-6 space-y-4">
        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            Загрузка...
          </div>
        ) : filteredReviews.length ? (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-lg font-bold text-slate-950">
                      {review.name}
                    </h2>
                    <StatusBadge status={review.status} />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatDate(review.createdAt)}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    {review.email || "—"}
                  </p>
                </div>

                <div className="text-sm font-semibold text-slate-700">
                  Рейтинг: {review.rating}/5
                </div>
              </div>

              <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">
                {review.text}
              </p>

              {review.reply ? (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Ответ</p>
                  <p className="mt-2 whitespace-pre-wrap text-slate-700">
                    {review.reply}
                  </p>
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => updateReview(review.id, "approve")}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Одобрить
                </button>
                <button
                  type="button"
                  onClick={() => updateReview(review.id, "reject")}
                  className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Отклонить
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReplyToId(review.id);
                    setReplyText(review.reply || "");
                  }}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Ответить
                </button>
                <button
                  type="button"
                  onClick={() => updateReview(review.id, "delete")}
                  className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            Отзывов нет
          </div>
        )}
      </div>

      {replyToId !== null ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl">
            <h3 className="text-xl font-bold text-slate-950">Ответ на отзыв</h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="mt-4 min-h-40 w-full rounded-2xl border border-slate-300 p-4 outline-none focus:border-slate-950"
              placeholder="Напиши ответ..."
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveReply}
                className="rounded-2xl bg-slate-950 px-4 py-2 font-semibold text-white"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={() => {
                  setReplyToId(null);
                  setReplyText("");
                }}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
