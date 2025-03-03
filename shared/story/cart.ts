import { create } from "zustand";
import { getCartDetails } from "@/shared/lib";
import { Api } from "@/shared/services/api-client";
import { CartStateItem } from "@/shared/lib/get-cart-details";

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /* Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запрос на добавление товара в корзину */
  addCartItem: (values: any) => Promise<void>;

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: any) => {},
  removeCartItem: async (id: number) => {},
}));

const tree = {
  type: "nested",
  children: [
    { type: "added", value: 42 },
    {
      type: "nested",
      children: [
        { type: "added", value: 99 },
        { type: "removed", value: 15 },
      ],
    },
    { type: "added", value: 67 },
  ],
};

const maxValue = findMaxValue(tree, "value");

console.log(maxValue); // 99

function findMaxValue(tree, key) {
  const stack = [tree];
  let maxValue = -Infinity;

  while (stack.length > 0) {
    const item = stack.pop();

    if (item[key] !== undefined) {
      maxValue = Math.max(maxValue, item[key]);
    }

    if (item.children) {
      stack.push(...item.children);
    }
  }

  return maxValue === -Infinity ? null : maxValue;
}
//
// /*
// Дана древовидная структура следующего формата:
//
// const tree = {
//     type: 'nested',
//     children: [
//         { type: 'added', value: 42 },
//         {
//             type: 'nested',
//             children: [
//                 { type: 'added', value: 43 },
//             ]
//         },
//         { type: 'added', value: 44 },
//         ...
//     ]
// }
//
// Необходимо написать функцию `getNodes(tree, type)`, которая возвращает все ноды в порядке следования, соответствующие переданному типу.
//
// Глубина вложенности любая.
//
// Пример:
//
// const addedItems = getNodes(tree, 'added');
//
// // Результат:
// [
//     { type: 'added', value: 42 },
//     { type: 'added', value: 43 },
//     { type: 'added', value: 44 },
//     ...
// ]
// */
//
// function getNodes(tree, type) {
//   const stack = [tree];
//   let result = [];
//
//   while (stack.length > 0) {
//     const item = stack.pop();
//
//     if (item.type === type) {
//       result.push(item);
//     }
//
//     if (item.children) {
//       stack.push(...item.children);
//     }
//   }
// }
//
// const addedItems = getNodes(tree, "added");
