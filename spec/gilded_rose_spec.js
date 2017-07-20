describe("Gilded Rose", function() {
  it("should insert an item named foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  it("should have a sellIn value which denotes the number of days we have to sell the item", () => {
    const gildedRose = new Shop([new Item("test", 10, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBeDefined();
  });

  it("should have have a quality value which denotes how valuable the item is", () => {
    const gildedRose = new Shop([new Item("test", 11, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBeDefined();
  });

  it("should lower sellin and quality at the end of every day", () => {
    const gildedRose = new Shop([new Item("test item1", 12, 30)]);
    gildedRose.items.push(new Item("item 2", 25, 20));
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(11);
    expect(items[0].quality).toBe(29);

    expect(items[1].sellIn).toBe(24);
    expect(items[1].quality).toBe(19);
  });
});
