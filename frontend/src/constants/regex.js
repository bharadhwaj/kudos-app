export const FIRST_NAME = /^[a-z][a-z'-]{2,}$/i;
export const FIRST_NAME_TYPING = /^[a-z][a-z'-]*$/i;

export const LAST_NAME = /^[a-z]+([' -]?[a-z]+)*$/i;
export const LAST_NAME_TYPING = /^[a-z]+[a-z' -]*$/i;

export const EMAIL = /^[a-z0-9][a-z0-9.!#$%&‘*+/=?^_`{|}~-]+@[a-z0-9.-]+(\.[a-z]{2,})+$/i;
export const EMAIL_TYPING = /^[a-z0-9][a-z0-9.!#$%&‘*+/=?^_`{|}~-]*@?[a-z]*(\.?[a-z]*)+$/i;
