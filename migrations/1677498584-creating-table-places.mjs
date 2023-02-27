export async function up(sql) {
  await sql`
  CREATE TABLE places(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    place_name varchar(100) NOT NULL,
    place_description varchar(1000) NOT NUll,
    latCoord varchar(100) NOT NULL,
    longCoord varchar(100) NOT NULL

  )`;
}

export async function down(sql) {
  await sql`
  DROP TABLE places`;
}
