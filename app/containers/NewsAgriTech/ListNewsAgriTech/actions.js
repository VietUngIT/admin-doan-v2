/*
 *
 * ListNewsAgriTech actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_LIST_NEWS_AGRI_TECH_ACTION,
  GET_LIST_NEWS_AGRI_TECH_ACTION_SUCCESS,
} from './constants';

export function getListNewsAgriTech(id,page) {
  return {
    type: GET_LIST_NEWS_AGRI_TECH_ACTION,
    id,
    page,
  };
}
export function getListNewsAgriTechSuccess(listNews,total) {
  return {
    type: GET_LIST_NEWS_AGRI_TECH_ACTION_SUCCESS,
    listNews,
    total,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
