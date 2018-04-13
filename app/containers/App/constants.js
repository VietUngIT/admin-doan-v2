/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */


export const DEFAULT_LOCALE = 'en';
export const GET_DOMAINS = 'app/GET_DOMAINS';
export const GET_DOMAINS_SUCCESS = 'app/GET_DOMAINS_SUCCESS';
export const IS_MOBILE = 'app/IS_MOBILE';
export const IS_SUPER_ADMIN = 'app/IS_SUPER_ADMIN';
export const SUGGEST_USER_BY_NN= 'app/SUGGEST_USER_BY_NN';
export const SUGGEST_USER_BY_NN_SUCCESS= 'app/SUGGEST_USER_BY_NN_SUCCESS';
export const LOAD_DUYET_DL_SUCCESS = 'app/LOAD_DUYET_DL_SUCCESS';
export const LOAD_DUYET_DL_CONFIRM = 'app/LOAD_DUYET_DL_CONFIRM';
export const IS_DUYET_DL_TAB = 'app/IS_DUYET_DL_TAB';

export const LOAD_DUYET_CARD = 'app/LOAD_DUYET_CARD';
export const LOAD_DUYET_CARD_SUCCESS = 'app/LOAD_DUYET_CARD_SUCCESS';
export const COUNT_CARD = 'app/COUNT_CARD';
export const COUNT_DL = 'app/COUNT_DL';
