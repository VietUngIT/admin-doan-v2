/*
 *
 * Bot actions
 *
 */

import {
  ADD_BOT,
  ADD_BOT_MONEY,
  ADD_BOT_SUCCESS,
  ADD_BOT_MONEY_SUCCESS
} from './constants';

export function addBot(bu,bn,m) {
  return {
    type: ADD_BOT,
    bu,
    bn,
    m
  };
}
export function addBotSuccess(data) {
  return {
    type: ADD_BOT_SUCCESS,
    data
  };
}
export function addBotMoney(m,bn) {
  return {
    type: ADD_BOT_MONEY,
    m,
    bn
  };
}
export function addBotMoneySuccess(data) {
  return {
    type: ADD_BOT_MONEY_SUCCESS,
    data
  };
}