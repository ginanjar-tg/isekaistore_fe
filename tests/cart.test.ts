import { describe, expect, it } from "vitest";
import { cartCount, cartReducer, cartTotal } from "@/lib/cart";
import type { Item } from "@/lib/items";

const items: Item[] = [
  { id: 1, name: "A", price: 100, rarity: "common", power: 1, flavor: "", image: "" },
  { id: 2, name: "B", price: 250, rarity: "rare", power: 5, flavor: "", image: "" },
];

describe("cartReducer", () => {
  it("adds an item", () => {
    expect(cartReducer({}, { type: "add", itemId: 1 })).toEqual({ 1: 1 });
  });

  it("increments an existing quantity", () => {
    expect(cartReducer({ 1: 2 }, { type: "add", itemId: 1 })).toEqual({ 1: 3 });
  });

  it("removes one at a time, deleting at zero", () => {
    expect(cartReducer({ 1: 2 }, { type: "remove", itemId: 1 })).toEqual({ 1: 1 });
    expect(cartReducer({ 1: 1 }, { type: "remove", itemId: 1 })).toEqual({});
  });

  it("remove on a missing item returns the same state", () => {
    expect(cartReducer({}, { type: "remove", itemId: 9 })).toEqual({});
  });

  it("setQty replaces the quantity", () => {
    expect(cartReducer({}, { type: "setQty", itemId: 2, qty: 5 })).toEqual({ 2: 5 });
  });

  it("setQty to zero removes the item", () => {
    expect(cartReducer({ 1: 3 }, { type: "setQty", itemId: 1, qty: 0 })).toEqual({});
  });

  it("clear empties the cart", () => {
    expect(cartReducer({ 1: 2, 2: 1 }, { type: "clear" })).toEqual({});
  });
});

describe("cart selectors", () => {
  it("counts total items", () => {
    expect(cartCount({ 1: 2, 2: 3 })).toBe(5);
  });

  it("computes total price", () => {
    expect(cartTotal({ 1: 2, 2: 1 }, items)).toBe(450);
  });
});
