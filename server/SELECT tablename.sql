SELECT tablename
FROM pg_tables
WHERE schemaname = 'public';


INSERT INTO reviews (name, email, text, rating, status, reply, helpful)
VALUES (
  'Тестовый клиент',
  'test@example.com',
  'Это тестовый отзыв',
  5,
  'approved',
  '',
  0
  
);


