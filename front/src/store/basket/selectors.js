import { createSelector } from 'reselect';

export const basketSelector = store => store.basket ? store.basket : []

export const basketProductsListSelector = createSelector(
  [basketSelector],
  basket => basket.data ? basket.data : []
)

export const basketIsLoadingSelector = createSelector(
  [basketSelector],
  basket => basket.isLoading ? basket.isLoading : false
)

// export const inBasketSelector = createSelector(
//   [basketSelector],
//   basket => basket.data.map( product => product.inBasket) ? basket.inBasket : false
// )

// export const productInBasketSelector = createSelector(
//   [basketSelector],
//   product => product.find()
// )