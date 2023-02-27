export const places = [
  {
    id: '1',
    place_name: 'Dschungel Theather',
    place_description:
      "children's theater is a vibrant and exciting art form that brings together the joys of performance with the wonder and curiosity of childhood",
    latcoord: '48.202175499999996',
    longcoord: '16.360151000000002',
  },
  {
    id: '2',
    place_name: 'Lilarum Theather',
    place_description:
      'Step into a world of wonder and imagination at Lilarum theater',
    latcoord: '48.200777',
    longcoord: '16.399163',
  },

  {
    id: '3',
    place_name: 'Kabarett Niedermair',
    place_description:
      'Join us for a magical adventure at our theater! Watch as your favorite characters come to life on stage, sing along to catchy tunes, and laugh with joy',
    latcoord: '48.209536',
    longcoord: '16.354413',
  },
  {
    id: '4',
    place_name: 'Kasperl und Pezi Wiener Urania Puppentheater',
    place_description: "Don't miss out on the fun, get your tickets now!",
    latcoord: '48.21151',
    longcoord: '16.383888',
  },
  {
    id: '5',
    place_name: 'Mumok - Museum Moderner Kunst',
    place_description:
      'The mumok is the largest museum in Central Europe for art since modernism. It makes the various aspects of the international and Austrian avant-garde accessible to everyone interested in the arts',
    latcoord: '48.203689499999996',
    longcoord: '16.3576845',
  },
  {
    id: '6',
    place_name: 'Naturhistorisches Museum',
    place_description:
      'The Natural History Museum Vienna preserves, expands, researches and presents its extensive collections covering biology, earth sciences, anthropology and archaeology in a building designed as a total work of art. It conveys the diversity of nature, the evolution of Planet Earth and life, and the related cultural development of humankind.',
    latcoord: '48.20518',
    longcoord: '16.359567',
  },
  {
    id: '7',
    place_name: 'ZOOM Kindermuseum',
    place_description:
      "ZOOM Children's Museum brings all the senses into play! Art, science and everyday culture can be explored in a playful way in exhibition and studio rooms specially designed for children.",
    latcoord: '48.202799999999996',
    longcoord: '16.3593415',
  },
  {
    id: '8',
    place_name: 'Technisches Museum Wien',
    place_description:
      'Historical objects enter into dialogue with innovative technologies in our multi-faceted exhibitions. With interactive experiences and exciting tours and programs our objects come to live while our puzzle hunt encourages an active and engaging museum visit.',
    latcoord: '48.1906655',
    longcoord: '16.317726',
  },
  {
    id: '9',
    place_name: 'Landgut Wien Cobenzl',
    place_description:
      "Children, teenagers, and adults can experience the farm up close through guided tours, family programs, and children's birthdays.",
    latcoord: '48.264097',
    longcoord: '16.320402',
  },
  {
    id: '10',
    place_name: 'Wasserspielplatz, Donauinsel',
    place_description:
      'At the water playground on the Donauinsel, children of all ages can splash around, jump in puddles, squirt water, create new riverbank areas out of mud, as well as dam up and divert streams.',
    latcoord: '48.225075',
    longcoord: '16.413625',
  },
];

export async function up(sql) {
  await sql`
    INSERT INTO places ${sql(
      places,
      'place_name',
      'place_description',
      'latcoord',
      'longcoord',
    )}
  `;
}

export async function down(sql) {
  for (const place of places) {
    await sql`
    DELETE FROM
    places
    WHERE
    id=${place.id} `;
  }
}
