import { createSelector } from 'reselect';

export const productsSelector = store => store.products ? store.products : null

export const productsListSelector = createSelector(
  [productsSelector],
  products => products.data ? products.data : []
)

export const productsIsLoadingSelector = createSelector(
  [productsSelector],
  products => products.isLoading ? products.isLoading : null
)