// Impure functions depend on external states and values and can produce side effects.

import { addItem_Pure } from "./pureFunctions";


// External values: the result may vary if the tax changes
const tax = 0.16;
function calculateTotal(price) {
  return price + (price * tax);
}

// Side effects: it mutates an external element
const initialList = [];
function addItem(item) {
  initialList.push(item);
}
// A pure version of this is this. As it does not mutate "initialList", instead, it returns a new array
const newItem = 10;
addItem_Pure(initialList, newItem);