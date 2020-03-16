import { TOAST } from '../constants/actions';

const initialState = {
  show: false,
  message: null,
  variant: null,
};

export default function toastReducer(state = initialState, action) {
  switch (action.type) {
    case TOAST.REQUEST_TO_SHOW_TOAST:
      return {
        ...state,
        message: action.payload.message,
        variant: action.payload.variant,
      };

    case TOAST.SHOW_TOAST:
      return {
        ...state,
        show: true,
        message: action.payload.message,
        variant: action.payload.variant,
      };

    case TOAST.HIDE_TOAST:
      return {
        ...state,
        show: false,
        message: null,
        variant: null,
      };

    default:
      return { ...state };
  }
}
