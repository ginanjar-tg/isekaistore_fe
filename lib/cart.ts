import type { Item } from "./items";

export type CartState = Record<number, number>;

export type CartAction =
  | { type: "add"; itemId: number }
  | { type: "remove"; itemId: number }
  | { type: "setQty"; itemId: number; qty: number }
  | { type: "clear" };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add":
      return { ...state, [action.itemId]: (state[action.itemId] ?? 0) + 1 };
    case "remove": {
      if (!state[action.itemId]) return state;
      const next = { ...state };
      if (next[action.itemId] > 1) next[action.itemId] -= 1;
      else delete next[action.itemId];
      return next;
    }
    case "setQty": {
      if (action.qty <= 0) {
        const cleared = { ...state };
        delete cleared[action.itemId];
        return cleared;
      }
      return { ...state, [action.itemId]: action.qty };
    }
    case "clear":
      return {};
  }
}

export function cartCount(state: CartState): number {
  return Object.values(state).reduce((sum, q) => sum + q, 0);
}

export function cartTotal(state: CartState, items: Item[]): number {
  return Object.entries(state).reduce((sum, [id, qty]) => {
    const item = items.find((i) => i.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);
}
