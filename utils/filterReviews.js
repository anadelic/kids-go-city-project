export default function Filter(items, places) {
  const filter = items.filter((item) => item.placeId === places.id);

  return filter;
}
