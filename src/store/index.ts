import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import categories from "@store/categories/categoriesSlice";
import products from "@store/products/productsSlice";
import cart from "@store/cart/cartSlice";
import wishlist from "@store/wishlist/wishlistSlice";
import auth from "@store/auth/authSlice"
import storageModule from "redux-persist/lib/storage";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
const storage = (storageModule as any).default ?? storageModule;

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart","auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken","user"]
};
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const rootReducer = combineReducers({
  categories,
  products,
  wishlist,
  auth: persistReducer(authPersistConfig,auth),
  cart: persistReducer(cartPersistConfig, cart),
});

const persistedReducer = persistReducer(rootPersistConfig,rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export { store, persistor };
