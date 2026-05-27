import React, { useEffect, useMemo, useState } from "react";
import InfoCard from "./InfoCard";
import SectionTitle from "./SectionTitle";

const API_BASE =
  import.meta.env.VITE_API_URL || "https://akpp-backend.onrender.com";

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xl text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={index < rating ? "text-amber-500" : "text-slate-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    approved: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-rose-100 text-rose-700",
  };

  const labels = {
    approved: "Одобрен",
    pending: "На модерации",
    rejected: "Отклонён",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${styles[status] || "bg-slate-100 text-slate-700"}`}
    >
      {labels[status] || status || "Неизвестно"}
    </span>
  );
}

function Avatar({ name }) {
  const letter = (name || "К").trim().charAt(0).toUpperCase();
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white shadow-sm">
      {letter}
    </div>
  );
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message =
      payload?.error ||
      payload?.message ||
      `Ошибка запроса: ${response.status}`;
    throw new Error(message);
  }

  return payload;
}

function normalizeReview(item) {
  return {
    id: item?.id,
    name: item?.name || "Клиент",
    text: item?.text || "",
    rating: Number(item?.rating || 5),
    status: item?.status || "pending",
    reply: item?.reply || "",
    createdAt: item?.createdAt || item?.created_at || new Date().toISOString(),
    helpful: Number(item?.helpful || 0),
  };
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [replyToId, setReplyToId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replySaving, setReplySaving] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    setMessage("");

    try {
      const data = await apiRequest("/api/reviews");
      const list = Array.isArray(data)
        ? data
        : data?.reviews || data?.items || [];
      setReviews(list.map(normalizeReview));
    } catch (error) {
      setReviews([]);
      setMessage(error.message || "Не удалось загрузить отзывы");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const summary = useMemo(() => {
    const total = reviews.length;
    const approved = reviews.filter(
      (item) => item.status === "approved",
    ).length;
    const pending = reviews.filter((item) => item.status === "pending").length;
    const rejected = reviews.filter(
      (item) => item.status === "rejected",
    ).length;
    const average =
      total === 0
        ? 0
        : reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) /
          total;

    return {
      total,
      approved,
      pending,
      rejected,
      average: average.toFixed(1),
    };
  }, [reviews]);

  const visibleReviews = useMemo(() => {
    let list = [...reviews];

    if (filter === "approved")
      list = list.filter((item) => item.status === "approved");
    if (filter === "pending")
      list = list.filter((item) => item.status === "pending");
    if (filter === "rejected")
      list = list.filter((item) => item.status === "rejected");
    if (filter === "5") list = list.filter((item) => Number(item.rating) === 5);

    if (sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "top") {
      list.sort((a, b) => Number(b.helpful || 0) - Number(a.helpful || 0));
    }

    return list;
  }, [reviews, filter, sortBy]);

  const approveReview = async (id) => {
    try {
      await apiRequest(`/api/reviews/${id}/approve`, { method: "PATCH" });
      setMessage("Отзыв одобрен");
      await loadReviews();
    } catch (error) {
      setMessage(error.message || "Не удалось одобрить отзыв");
    }
  };

  const rejectReview = async (id) => {
    try {
      await apiRequest(`/api/reviews/${id}/reject`, { method: "PATCH" });
      setMessage("Отзыв отклонён");
      await loadReviews();
    } catch (error) {
      setMessage(error.message || "Не удалось отклонить отзыв");
    }
  };

  const deleteReview = async (id) => {
    try {
      await apiRequest(`/api/reviews/${id}`, { method: "DELETE" });
      setMessage("Отзыв удалён");
      if (replyToId === id) {
        setReplyToId(null);
        setReplyText("");
      }
      await loadReviews();
    } catch (error) {
      setMessage(error.message || "Не удалось удалить отзыв");
    }
  };

  const handleHelpful = async (id) => {
    try {
      await apiRequest(`/api/reviews/${id}/helpful`, { method: "POST" });
      setMessage("Счётчик полезности обновлён");
      await loadReviews();
    } catch (error) {
      setMessage(error.message || "Не удалось обновить полезность");
    }
  };

  const openReply = (review) => {
    setReplyToId(review.id);
    setReplyText(review.reply || "");
  };

  const saveReply = async () => {
    if (!replyToId) return;
    setReplySaving(true);

    try {
      await apiRequest(`/api/reviews/${replyToId}/reply`, {
        method: "PATCH",
        body: JSON.stringify({ reply: replyText.trim() }),
      });
      setMessage("Ответ сохранён");
      setReplyToId(null);
      setReplyText("");
      await loadReviews();
    } catch (error) {
      setMessage(error.message || "Не удалось сохранить ответ");
    } finally {
      setReplySaving(false);
    }
  };

  return (
    <section
      id="admin"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
    >
      <SectionTitle
        eyebrow="Админка"
        title="Модерация отзывов"
        text="Здесь можно управлять отзывами: одобрять, отклонять, отвечать и удалять."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <InfoCard className="p-5">
          <p className="text-sm text-slate-500">Всего</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {summary.total}
          </p>
        </InfoCard>
        <InfoCard className="p-5">
          <p className="text-sm text-slate-500">Средняя оценка</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {summary.average}
          </p>
        </InfoCard>
        <InfoCard className="p-5">
          <p className="text-sm text-slate-500">Одобрено</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {summary.approved}
          </p>
        </InfoCard>
        <InfoCard className="p-5">
          <p className="text-sm text-slate-500">На модерации</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {summary.pending}
          </p>
        </InfoCard>
        <InfoCard className="p-5">
          <p className="text-sm text-slate-500">Отклонено</p>
          <p className="mt-2 text-3xl font-black text-slate-950">
            {summary.rejected}
          </p>
        </InfoCard>
      </div>

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {[
            ["all", "Все"],
            ["approved", "Одобренные"],
            ["pending", "На модерации"],
            ["rejected", "Отклонённые"],
            ["5", "Только 5★"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === key
                  ? "bg-slate-950 text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10 lg:w-64"
        >
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="top">Сначала полезные</option>
        </select>
      </div>

      {message ? (
        <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {message}
        </p>
      ) : null}

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.7fr)]">
        <div className="space-y-4">
          {loading ? (
            <InfoCard className="p-6 text-slate-500">Загрузка...</InfoCard>
          ) : visibleReviews.length ? (
            visibleReviews.map((review) => (
              <InfoCard
                key={review.id}
                className="rounded-[32px] p-6 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <Avatar name={review.name} />

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-950">
                          {review.name}
                        </h3>
                        <StatusBadge status={review.status} />
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                          Google
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-slate-500">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>

                  <StarRow rating={review.rating} />
                </div>

                <p className="mt-6 text-lg leading-relaxed text-slate-700">
                  {review.text}
                </p>

                {review.reply ? (
                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      Ответ компании
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-slate-600">
                      {review.reply}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={() => handleHelpful(review.id)}
                    className="rounded-full border border-slate-200 px-5 py-3 font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Полезно ({review.helpful || 0})
                  </button>

                  {review.status !== "approved" && (
                    <button
                      type="button"
                      onClick={() => approveReview(review.id)}
                      className="rounded-full bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
                    >
                      Одобрить
                    </button>
                  )}

                  {review.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() => rejectReview(review.id)}
                      className="rounded-full bg-amber-500 px-6 py-3 font-semibold text-white transition hover:bg-amber-600"
                    >
                      Отклонить
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => openReply(review)}
                    className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    Ответить
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteReview(review.id)}
                    className="rounded-full bg-rose-500 px-6 py-3 font-semibold text-white transition hover:bg-rose-600"
                  >
                    Удалить
                  </button>
                </div>
              </InfoCard>
            ))
          ) : (
            <InfoCard className="p-6 text-slate-500">
              Пока ничего нет. Нажми «Обновить».
            </InfoCard>
          )}
        </div>

        <InfoCard className="h-fit p-6">
          <p className="text-sm font-semibold text-slate-500">Управление</p>
          <h3 className="mt-2 text-2xl font-black text-slate-950">
            Обновить список
          </h3>
          <p className="mt-2 text-slate-600">
            Нажми кнопку, если добавил новый отзыв или хочешь обновить
            модерацию.
          </p>

          <button
            type="button"
            onClick={loadReviews}
            className="mt-5 w-full rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Загрузить отзывы
          </button>

          {replyToId !== null && (
            <div className="mt-8 rounded-[28px] border border-slate-200 bg-white p-5">
              <h4 className="text-lg font-bold text-slate-950">
                Ответ на отзыв
              </h4>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Напишите ответ"
                className="mt-4 min-h-40 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
              />
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={saveReply}
                  disabled={replySaving}
                  className="rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {replySaving ? "Сохранение..." : "Сохранить ответ"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReplyToId(null);
                    setReplyText("");
                  }}
                  className="rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
        </InfoCard>
      </div>
    </section>
  );
}
