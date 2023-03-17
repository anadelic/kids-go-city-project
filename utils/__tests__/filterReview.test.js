import Filter from '../filterReviews';

describe('Filter function', () => {
  const reviews = [
    { id: 1, name: 'review 1', placeId: 1 },
    { id: 2, name: 'review 2', placeId: 2 },
    { id: 3, name: 'review 3', placeId: 1 },
  ];

  const places = { id: 1, name: 'Place 1' };

  it('returns the correct filtered items', () => {
    const filteredItems = Filter(reviews, places);

    expect(filteredItems).toHaveLength(2);
    expect(filteredItems).toContainEqual({
      id: 1,
      name: 'review 1',
      placeId: 1,
    });
    expect(filteredItems).toContainEqual({
      id: 3,
      name: 'review 3',
      placeId: 1,
    });
  });

  it('returns an empty array when there are no matching items', () => {
    const noMatch = Filter(reviews, { id: 10, name: 'Place 10' });

    expect(noMatch).toHaveLength(0);
    expect(noMatch).toEqual([]);
  });
});
