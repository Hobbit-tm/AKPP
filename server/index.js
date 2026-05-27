import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const { Pool } = pg;
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://hobbit-tm.github.io",
    ],
    credentials: true,
  }),
);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "682818";

app.post("/api/admin/login", async (req, res) => {
  const password = String(req.body?.password || "");

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      error: "Неверный пароль",
    });
  }

  res.json({
    token: "admin_ok",
  });
});

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Если у тебя PostgreSQL требует SSL (например, в облаке),
  // раскомментируй следующую строку:
  // ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS reviews (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      text TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      status TEXT NOT NULL DEFAULT 'pending',
      reply TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      helpful INTEGER NOT NULL DEFAULT 0
    );
  `);
}

function normalizeReview(row) {
  return {
    id: Number(row.id),
    name: row.name,
    email: row.email || "",
    text: row.text,
    rating: Number(row.rating),
    status: row.status,
    reply: row.reply || "",
    createdAt: row.created_at,
    helpful: Number(row.helpful || 0),
  };
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "reviews-server" });
});

app.get("/api/reviews", async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, text, rating, status, reply, created_at, helpful
      FROM reviews
      ORDER BY created_at DESC, id DESC
    `);

    res.json(result.rows.map(normalizeReview));
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    res.status(500).json({ error: "Не удалось загрузить отзывы" });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const { name, email, text, rating } = req.body || {};
    const reviewText = String(text || "").trim();

    if (!reviewText) {
      return res.status(400).json({ error: "Текст отзыва обязателен" });
    }

    const reviewName = String(name || "Клиент").trim() || "Клиент";
    const reviewRating = Math.max(1, Math.min(5, Number(rating) || 5));

    // console.log("Новый отзыв:", {
    //   name: reviewName,
    //   text: reviewText,
    //   rating: reviewRating,
    // });

    const result = await pool.query(
      `
      INSERT INTO reviews (name, email, text, rating, status, reply, helpful)
      VALUES ($1, $2, $3, $4, 'pending', '', 0)
      RETURNING id, name, text, rating, status, reply, created_at, helpful
      `,
      [reviewName, String(email || "").trim(), reviewText, reviewRating],
    );

    res.status(201).json({ review: normalizeReview(result.rows[0]) });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    res.status(500).json({ error: "Не удалось сохранить отзыв" });
  }
});

app.patch("/api/reviews/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      UPDATE reviews
      SET status = 'approved'
      WHERE id = $1
      RETURNING id, name, text, rating, status, reply, created_at, helpful
      `,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Отзыв не найден" });
    }

    res.json({ review: normalizeReview(result.rows[0]) });
  } catch (error) {
    console.error("PATCH /api/reviews/:id/approve error:", error);
    res.status(500).json({ error: "Не удалось одобрить отзыв" });
  }
});

app.patch("/api/reviews/:id/reject", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      UPDATE reviews
      SET status = 'rejected'
      WHERE id = $1
      RETURNING id, name, text, rating, status, reply, created_at, helpful
      `,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Отзыв не найден" });
    }

    res.json({ review: normalizeReview(result.rows[0]) });
  } catch (error) {
    console.error("PATCH /api/reviews/:id/reject error:", error);
    res.status(500).json({ error: "Не удалось отклонить отзыв" });
  }
});

app.patch("/api/reviews/:id/reply", async (req, res) => {
  try {
    const { id } = req.params;
    const reply = String(req.body?.reply || "").trim();

    if (!reply) {
      return res.status(400).json({ error: "Текст ответа обязателен" });
    }

    const result = await pool.query(
      `
      UPDATE reviews
      SET reply = $2
      WHERE id = $1
      RETURNING id, name, text, rating, status, reply, created_at, helpful
      `,
      [id, reply],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Отзыв не найден" });
    }

    res.json({ review: normalizeReview(result.rows[0]) });
  } catch (error) {
    console.error("PATCH /api/reviews/:id/reply error:", error);
    res.status(500).json({ error: "Не удалось сохранить ответ" });
  }
});

app.post("/api/reviews/:id/helpful", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      UPDATE reviews
      SET helpful = helpful + 1
      WHERE id = $1
      RETURNING id, name, text, rating, status, reply, created_at, helpful
      `,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Отзыв не найден" });
    }

    res.json({ review: normalizeReview(result.rows[0]) });
  } catch (error) {
    console.error("POST /api/reviews/:id/helpful error:", error);
    res.status(500).json({ error: "Не удалось обновить счётчик полезности" });
  }
});

app.delete("/api/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `DELETE FROM reviews WHERE id = $1 RETURNING id`,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Отзыв не найден" });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/reviews/:id error:", error);
    res.status(500).json({ error: "Не удалось удалить отзыв" });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: "Маршрут не найден" });
});

async function start() {
  try {
    await initDb();
    await pool.query("SELECT NOW()");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log("PostgreSQL connected");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

start();
