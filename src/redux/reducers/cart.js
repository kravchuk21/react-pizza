const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);
const cart = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PIZZA_CART": {
      const currentPizzasItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzasItems,
          totalPrice: getTotalPrice(currentPizzasItems),
        },
      };

      const totalCount = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].items.length + sum,
        0
      );
      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].totalPrice + sum,
        0
      );

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case "REMOVE_CART_ITEM": {
      const newPizzasItems = {
        ...state.items,
      };
      const currentTotlalPrice = newPizzasItems[action.payload].totalPrice;
      const currentTotlalCount = newPizzasItems[action.payload].items.length;
      delete newPizzasItems[action.payload];
      return {
        ...state,
        items: newPizzasItems,
        totalPrice: state.totalPrice - currentTotlalPrice,
        totalCount: state.totalCount - currentTotlalCount,
      };
    }
    case "PLUS_CART_ITEM": {
      const newObjItems = [
        ...state.items[action.payload].items,
        state.items[action.payload].items[0],
      ];

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const totalCount = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].items.length + sum,
        0
      );
      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].totalPrice + sum,
        0
      );

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case "MINUS_CART_ITEM": {
      const oldItems = state.items[action.payload].items;
      const newObjItems =
        oldItems.length > 1
          ? state.items[action.payload].items.slice(1)
          : oldItems;

      const newItems = {
        ...state.items,
        [action.payload]: {
          items: newObjItems,
          totalPrice: getTotalPrice(newObjItems),
        },
      };
      const totalCount = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].items.length + sum,
        0
      );
      const totalPrice = Object.keys(newItems).reduce(
        (sum, key) => newItems[key].totalPrice + sum,
        0
      );

      return {
        ...state,
        items: newItems,
        totalCount,
        totalPrice,
      };
    }
    case "CLEAR_CART":
      return {
        items: {},
        totalPrice: 0,
        totalCount: 0,
      };
    default:
      return state;
  }
};

export default cart;
