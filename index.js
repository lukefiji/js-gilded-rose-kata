const { Item, Shop } = require("./src/gildedRose");

const items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new Item("Aged Brie", 2, 0));
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new Item("Sulfuras, Hand of Ragnaros", -1, 80));
items.push(new Item("Backstage Passes", 15, 20));
items.push(new Item("Backstage Passes", 10, 49));
items.push(new Item("Backstage Passes", 5, 49));
// this conjured item does not work properly yet
items.push(new Item("Conjured Mana Cake", 3, 6));

var days = 10;

let gildedRose = new Shop(items);

for (var i = 0; i < days; i++) {
  showHeaderFor(i);
  showItemsFor(i);
  gildedRose.updateQuality();
}

function showHeaderFor(day) {
  console.log(`-------- Day ${day} ----------`);
}

function showItemsFor(day) {
  console.log("name, sellIn, quality");
  for (var j = 0; j < items.length; j++) {
    var item = items[j];
    console.log(`${item.name}, + ${item.sellIn}, ${item.quality}`);
  }
  console.log("");
}

function updateQuality() {
  for (var k = 0; k < items.length; k++) {
    items[k].updateQuality();
  }
}
