// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Session/LoginPage/reducer'),
          import('containers/Session/LoginPage/sagas'),
          import('containers/Session/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('login', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/cculog',
      name: 'ccuTab',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CcuTab/reducer'),
          import('containers/CcuTab/sagas'),
          import('containers/CcuTab'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('ccuTab', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/session/register',
      name: 'register',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Session/RegisterPage/reducer'),
          import('containers/Session/RegisterPage/sagas'),
          import('containers/Session/RegisterPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('register', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/home',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage/sagas'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/dash',
      name: 'ccuTab',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CcuTab/reducer'),
          import('containers/CcuTab/sagas'),
          import('containers/CcuTab'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('ccuTab', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/money',
      name: 'moneyContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MoneyContainer/reducer'),
          import('containers/MoneyContainer/sagas'),
          import('containers/MoneyContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('moneyContainer', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/moneytotal',
          name: 'moneyTotal',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/MoneyTotal/reducer'),
              import('containers/MoneyTotal/sagas'),
              import('containers/MoneyTotal'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([reducer, sagas, component]) => {
              injectReducer('moneyTotal', reducer.default);
              injectSagas(sagas.default);
    
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        },
        {
          path: '/moneydetail/:un-:st-:et-:itype',
          name: 'moneyDetail',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/MoneyDetail/reducer'),
              import('containers/MoneyDetail/sagas'),
              import('containers/MoneyDetail'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('moneyDetail', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/moneyoutdetail/:un-:st-:et',
          name: 'moneyOutDetail',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/MoneyOutDetail/reducer'),
              import('containers/MoneyOutDetail/sagas'),
              import('containers/MoneyOutDetail'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('moneyOutDetail', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ]
    },
    {
      path: '/moneyIn',
      name: 'totalMoney',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TotalMoney/reducer'),
          import('containers/TotalMoney/sagas'),
          import('containers/TotalMoney'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('totalMoney', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/money_ht',
      name: 'tienHt',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TienHt/reducer'),
          import('containers/TienHt/sagas'),
          import('containers/TienHt'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('tienHt', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/count_hdh',
      name: 'countHdh',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CountHdh/reducer'),
          import('containers/CountHdh/sagas'),
          import('containers/CountHdh'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('countHdh', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/count_dau',
      name: 'countDau',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CountDau/reducer'),
          import('containers/CountDau/sagas'),
          import('containers/CountDau'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('countDau', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/check_seri',
      name: 'checkSeri',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CheckSeri/reducer'),
          import('containers/CheckSeri/sagas'),
          import('containers/CheckSeri'),
        ]);
        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('checkSeri', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/moneyOut',
      name: 'detailMoney',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DetailMoney/reducer'),
          import('containers/DetailMoney/sagas'),
          import('containers/DetailMoney'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('detailMoney', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/message',
      name: 'message',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Message/reducer'),
          import('containers/Message/sagas'),
          import('containers/Message'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('message', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/notification',
      name: 'notification',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Notification/reducer'),
          import('containers/Notification/sagas'),
          import('containers/Notification'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('notification', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/search_game',
      name: 'searchGame',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SearchGame/reducer'),
          import('containers/SearchGame/sagas'),
          import('containers/SearchGame'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('searchGame', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/top_win',
      name: 'topGame',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TopGame/reducer'),
          import('containers/TopGame/sagas'),
          import('containers/TopGame'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('topGame', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/top_loose',
      name: 'topLoose',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TopLoose/reducer'),
          import('containers/TopLoose/sagas'),
          import('containers/TopLoose'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('topLoose', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/lich-su-mini-game',
      name: 'miniGame',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MiniGame/reducer'),
          import('containers/MiniGame/sagas'),
          import('containers/MiniGame'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('miniGame', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/lich-su-slot-game',
      name: 'slotGameByNickname',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SlotGameByNickname/reducer'),
          import('containers/SlotGameByNickname/sagas'),
          import('containers/SlotGameByNickname'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('slotGameByNickname', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/revenue',
      name: 'revenue',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Revenue/reducer'),
          import('containers/Revenue/sagas'),
          import('containers/Revenue'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('revenue', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/setup-account',
      name: 'setAdmin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SetAdmin/reducer'),
          import('containers/SetAdmin/sagas'),
          import('containers/SetAdmin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('setAdmin', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/daily',
      name: 'daiLy',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DaiLy/reducer'),
          import('containers/DaiLy/sagas'),
          import('containers/DaiLy'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('daiLy', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/transfer',
      name: 'duyetDl',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DuyetDl/reducer'),
          import('containers/DuyetDl/sagas'),
          import('containers/DuyetDl'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('duyetDl', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/card',
      name: 'duyetCard',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DuyetCard/reducer'),
          import('containers/DuyetCard/sagas'),
          import('containers/DuyetCard'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('duyetCard', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/set-max-cashout',
      name: 'cashOut',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CashOut/reducer'),
          import('containers/CashOut/sagas'),
          import('containers/CashOut'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('cashOut', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/money-history',
      name: 'moneyHistory',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MoneyHistory/reducer'),
          import('containers/MoneyHistory/sagas'),
          import('containers/MoneyHistory'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('moneyHistory', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/bot',
      name: 'bot',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Bot/reducer'),
          import('containers/Bot/sagas'),
          import('containers/Bot'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('bot', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/add-user-event',
      name: 'even',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Even/reducer'),
          import('containers/Even/sagas'),
          import('containers/Even'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('even', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/setup-event',
      name: 'setUpEvent',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SetUpEvent/reducer'),
          import('containers/SetUpEvent/sagas'),
          import('containers/SetUpEvent'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('setUpEvent', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/gen-gitt-code',
      name: 'gittCode',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/GittCode/reducer'),
          import('containers/GittCode/sagas'),
          import('containers/GittCode'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('gittCode', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/lucky-rolation',
      name: 'lucKyRotation',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LucKyRotation/reducer'),
          import('containers/LucKyRotation/sagas'),
          import('containers/LucKyRotation'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('lucKyRotation', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/banner',
      name: 'banner',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Banner/reducer'),
          import('containers/Banner/sagas'),
          import('containers/Banner'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('banner', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/bet-sum-tx',
      name: 'sumTx',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/SumTx/reducer'),
          import('containers/SumTx/sagas'),
          import('containers/SumTx'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('sumTx', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/message-tx',
      name: 'messageTx',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MessageTx/reducer'),
          import('containers/MessageTx/sagas'),
          import('containers/MessageTx'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('messageTx', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/top-money',
      name: 'topNapTien',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/TopNapTien/reducer'),
          import('containers/TopNapTien/sagas'),
          import('containers/TopNapTien'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('topNapTien', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/online-account',
      name: 'accountOnline',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/AccountOnline/reducer'),
          import('containers/AccountOnline/sagas'),
          import('containers/AccountOnline'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('accountOnline', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/ip',
      name: 'chanIp',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ChanIp/reducer'),
          import('containers/ChanIp/sagas'),
          import('containers/ChanIp'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('chanIp', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/check-ip',
      name: 'checkIp',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CheckIp/reducer'),
          import('containers/CheckIp/sagas'),
          import('containers/CheckIp'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('checkIp', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/sms-active',
      name: 'smsactive',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Smsactive/reducer'),
          import('containers/Smsactive/sagas'),
          import('containers/Smsactive'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('smsactive', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/back-up',
      name: 'backup',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Backup/reducer'),
          import('containers/Backup/sagas'),
          import('containers/Backup'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('backup', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/xhu',
      name: 'xhu',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Xhu/reducer'),
          import('containers/Xhu/sagas'),
          import('containers/Xhu'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('xhu', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
    },
    {
      path: '/events',
      name: 'eventParent',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/EventParent/reducer'),
          import('containers/EventParent/sagas'),
          import('containers/EventParent'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('eventParent', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      
      childRoutes: [
        {
          path: '/event-game',
          name: 'eventGame',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/EventGame/reducer'),
              import('containers/EventGame/sagas'),
              import('containers/EventGame'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([reducer, sagas, component]) => {
              injectReducer('eventGame', reducer.default);
              injectSagas(sagas.default);
    
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        },
        {
          path: '/prize/:eid/:ename',
          name: 'prizeGame',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/PrizeGame/reducer'),
              import('containers/PrizeGame/sagas'),
              import('containers/PrizeGame'),
            ]);
    
            const renderRoute = loadModule(cb);
    
            importModules.then(([reducer, sagas, component]) => {
              injectReducer('prizeGame', reducer.default);
              injectSagas(sagas.default);
    
              renderRoute(component);
            });
    
            importModules.catch(errorLoading);
          },
        },
      ]
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
