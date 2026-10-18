import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "..";

const getTotalCartQntSelector = createSelector(
  [(state: RootState) => state.cart.items],
  (items) => Object.values(items).reduce((acc, qnt) => acc + qnt, 0),
);

export { getTotalCartQntSelector };