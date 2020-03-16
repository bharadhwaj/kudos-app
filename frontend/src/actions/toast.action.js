import { TOAST } from '../constants/actions';

export function requestToShowToast(variant, message) {
  return { type: TOAST.REQUEST_TO_SHOW_TOAST, payload: { variant, message } };
}

export function showToast(variant, message) {
  return { type: TOAST.SHOW_TOAST, payload: { variant, message } };
}

export function hideToast() {
  return { type: TOAST.HIDE_TOAST };
}
