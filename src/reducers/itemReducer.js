import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
  items: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, items: action.payload, loading: false };
    case DELETE_ITEM:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        items: state.items.filter(x => x._id !== action.payload),
        loading: false,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
        loading: false,
      };
    case ITEMS_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
}
