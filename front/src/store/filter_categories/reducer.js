import * as actions from './actions'

export const filters = (state = actions.filters.SHOW_ALL, action) => {
   switch (action.type) {
    case actions.SET_FILTER:
      return action.filter;
    default:
      return state
  }
}