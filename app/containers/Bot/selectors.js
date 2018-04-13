import { createSelector } from 'reselect';

/**
 * Direct selector to the bot state domain
 */
const selectBotDomain = () => (state) => state.get('bot');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Bot
 */

const selectBnBot = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('bn_bot')
);
const selectBuBot = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('bu_bot')
);
const selectMBot = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('m_bot')
);
const selectDataBot = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('data_bot')
);
const selectBnMoney = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('bn_money')
);
const selectMMoney = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('m_money')
);
const selectDataMoney = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('data_money')
);
const selectIsAddMoney = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('isAddMoney')
);
const selectIsAddBot = () => createSelector(
  selectBotDomain(),
  (substate) => substate.get('isAddBot')
);
export {
  selectBotDomain,
  selectBnBot,
  selectBuBot,
  selectMBot,
  selectBnMoney,
  selectMMoney,
  selectDataBot,
  selectDataMoney,
  selectIsAddMoney,
  selectIsAddBot
};
