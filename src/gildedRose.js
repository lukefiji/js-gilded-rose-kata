exports.Item = class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
};

exports.Shop = class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    return this.items.map(item => {
      // Set a base quality Modifier
      let qualityModifier = 1;

      // Quality goes down twice as fast when expired
      if (item.sellIn <= 0) {
        qualityModifier *= 2;
      }

      // "Conjured" items degrade in quality twice as fast as normal items
      if (item.name.startsWith("Conjured")) {
        qualityModifier *= 2;
      }

      if (item.name === "Aged Brie") {
        qualityModifier *= -1;
      }

      if (item.name === "Backstage Passes") {
        qualityModifier = -1;

        if (item.sellIn <= 10) {
          qualityModifier = -2;
        }

        if (item.sellIn <= 5) {
          qualityModifier = -3;
        }

        if (item.sellIn <= 0) {
          qualityModifier = 0;
          item.quality = 0;
        }
      }

      // Don't change quality or sellIn of legendary items
      if (item.name !== "Sulfuras, Hand of Ragnaros") {
        item.sellIn -= 1;
        item.quality -= qualityModifier;
      }

      // Prevent item quality from going below 0
      if (item.quality < 0) {
        item.quality = 0;
      }

      // Prevent item quality from going above 0
      if (item.quality > 50 && item.name !== "Sulfuras, Hand of Ragnaros") {
        item.quality = 50;
      }

      return item;
    });
  }
};
