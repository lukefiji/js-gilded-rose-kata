var Table = require("easy-table");

const { Item, Shop } = require("./src/gildedRose");

const items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new Item("Aged Brie", 2, 0));
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new Item("Expired item", 0, 30));
items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new Item("Sulfuras, Hand of Ragnaros", -1, 80));
items.push(new Item("Backstage Passes", 15, 20));
items.push(new Item("Backstage Passes", 10, 49));
items.push(new Item("Backstage Passes", 5, 49));
// Conjured items are not yet working properly
// items.push(new Item("Conjured Mana Cake", 3, 30));
var days = 10;

let gildedRose = new Shop(items);

for (var i = 0; i < days; i++) {
  showHeaderFor(i);
  showItemsFor();
  gildedRose.updateQuality();
}

function showHeaderFor(day) {
  console.log(`================== DAY ${day} ==================`);
}

function showItemsFor() {
  let itemTable = new Table();

  items.forEach(item => {
    itemTable.cell("Name", item.name);
    itemTable.cell("Sell In", item.sellIn);
    itemTable.cell("Quality", item.quality);
    itemTable.newRow();
  });

  console.log(itemTable.toString());
}

function updateQuality() {
  for (var k = 0; k < items.length; k++) {
    items[k].updateQuality();
  }
}
