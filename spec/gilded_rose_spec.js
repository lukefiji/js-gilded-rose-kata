describe("Gilded Rose", () => {
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

  it("should lower quality twice as fast when sellin is less than 0", () => {
    const gildedRose = new Shop([new Item("Zero Quality", 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("should never have quality go below 0", () => {
    const gildedRose = new Shop([new Item("Arbitrary Item", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should never have quality go above 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should increase quality of 'Aged Brie' the older it gets", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 20, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(11);
  });

  it("should never decrease the sellin or quality of 'Sulfuras, Hand of Ragnaros'", () => {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 20, 80)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(20);
    expect(items[0].quality).toBe(80);
  });

  it("should decrease 'Backstage passes' quality as it's sell_in value decreases; quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert", () => {
    const gildedRose = new Shop([
      new Item("Backstage Passes", 20, 10),
      new Item("Backstage Passes", 10, 20),
      new Item("Backstage Passes", 5, 30),
      new Item("Backstage Passes", 0, 40)
    ]);
    const items = gildedRose.updateQuality();

    // More than 10 days
    expect(items[0].quality).toBe(11);

    // Less than 10 days
    expect(items[1].quality).toBe(22);

    // More than 10 days
    expect(items[2].quality).toBe(33);

    // More than 10 days
    expect(items[3].quality).toBe(0);
  });
});
