export async function up(sql) {
  await sql`
  CREATE TABLE places(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    place_name varchar(100) NOT NULL,
    place_description varchar(1000) NOT NUll,
    latCoord decimal NOT NULL,
    longCoord decimal NOT NULL,
    place_adress varchar(100),
    image_url varchar(130),
    user_id integer REFERENCES users(id)
  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE places`;
}
