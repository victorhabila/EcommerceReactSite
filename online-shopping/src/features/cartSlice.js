import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  //checking whether we have cartitems in our local storage. if yes return it else set to default(empty array)
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      //first check whether the product you are adding to cart already existing using findIndex array method
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id //payload is simply the data(form data or any data your are returning or parsing after performing an action)
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1; //incrementing cart item quantity in our state
        toast.info(`Increased ${action.payload.name}  quantity`, {
          position: "top-center",
        });
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }; //initializing cart quanity in cart state
        state.cartItems.push(tempProduct);
        toast.success(`${action.payload.name}  added to cart`, {
          position: "top-center",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //a reducer to delete item from cart using filter. it returns the items not equal to the action payload id of item clicked
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItems) => cartItems.id !== action.payload.id
      );

      //then we update our state with the remaining items

      state.cartItems = nextCartItems;

      //also update our local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      toast.error(`${action.payload.name}  removed from cart`, {
        position: "top-center",
      });
    },

    //decrease cart reducer
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItems) => cartItems.id === action.payload.id
      );
      //this will first check if cart quantity is more than one, then reduce it my one when removing from cart
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;

        toast.info(`Decreased ${action.payload.name} cart quantity`, {
          position: "top-center",
        });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItems) => cartItems.id !== action.payload.id
        );

        //then we update our state with the remaining items

        state.cartItems = nextCartItems;

        toast.error(`${action.payload.name}  removed from cart`, {
          position: "top-center",
        });
      }

      //also update our local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //this reducer will clear our cart
    clearCart(state, action) {
      state.cartItems = [];

      toast.info(`Cart cleared`, {
        position: "top-center",
      });

      //also update our local storage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    //get totals reducers

    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal; //this will return an object having our total price and total quantity
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
