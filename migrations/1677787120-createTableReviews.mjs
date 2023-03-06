export async function up(sql) {
  await sql`
  CREATE TABLE reviews(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(100) NOT NULL,
    review_text varchar(1000) NOT NUll,
    star_rating varchar (50),
    user_id integer REFERENCES users(id) ON DELETE CASCADE,
    place_id integer REFERENCES places(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()

  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE reviews`;
}
