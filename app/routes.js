// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Login/reducer'),
          import('containers/Login/sagas'),
          import('containers/Login'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('login', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/infoadmin',
      name: 'infoAdmin',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/InfoAdmin/reducer'),
          import('containers/InfoAdmin/sagas'),
          import('containers/InfoAdmin'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('infoAdmin', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/news',
      name: 'news',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewsManager_v2/NewsEvent/CateNewsEvent/reducer'),
          import('containers/NewsManager_v2/NewsEvent/CateNewsEvent/sagas'),
          import('containers/NewsManager_v2/NewsEvent/CateNewsEvent/'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('news', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      }
    },{
      path: '/news/:id_cate_news',
      name: 'listNewsEvent',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewsManager_v2/NewsEvent/ListNewsEvent/reducer'),
          import('containers/NewsManager_v2/NewsEvent/ListNewsEvent/sagas'),
          import('containers/NewsManager_v2/NewsEvent/ListNewsEvent'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('listNewsEvent', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/news/:id_cate_news/:id_news',
      name: 'newsdetail',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewsDetail/reducer'),
          import('containers/NewsDetail/sagas'),
          import('containers/NewsDetail'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('newsdetail', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/marketinfo',
      name: 'marketinfo',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewsManager_v2/MarketInfo/CateMarketInfo/reducer'),
          import('containers/NewsManager_v2/MarketInfo/CateMarketInfo/sagas'),
          import('containers/NewsManager_v2/MarketInfo/CateMarketInfo/'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('marketinfo', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/marketinfo/:id_cate_news',
      name: 'listMarketInfo',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewsManager_v2/MarketInfo/ListMarketInfo/reducer'),
          import('containers/NewsManager_v2/MarketInfo/ListMarketInfo/sagas'),
          import('containers/NewsManager_v2/MarketInfo/ListMarketInfo'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('listMarketInfo', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/agritech',
      name: 'cateAgriTech',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewsManager_v2/AgriTech/CateAgriTech/reducer'),
          import('containers/NewsManager_v2/AgriTech/CateAgriTech/sagas'),
          import('containers/NewsManager_v2/AgriTech/CateAgriTech'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('cateAgriTech', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/agritech/:id_cate_news',
          name: 'subCateAgriTech',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/NewsManager_v2/AgriTech/SubCateAgriTech/reducer'),
              import('containers/NewsManager_v2/AgriTech/SubCateAgriTech/sagas'),
              import('containers/NewsManager_v2/AgriTech/SubCateAgriTech'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('subCateAgriTech', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, 
      ]
    },{
      path: '/agritech/:id_cate_news/:id_sub_cate',
      name: 'listAgritech',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewsManager_v2/AgriTech/ListAgritech/reducer'),
          import('containers/NewsManager_v2/AgriTech/ListAgritech/sagas'),
          import('containers/NewsManager_v2/AgriTech/ListAgritech'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('listAgritech', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/marketprice',
      name: 'cateMarketPrice',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewsManager_v2/MarketPrice/CateMarketPrice/reducer'),
          import('containers/NewsManager_v2/MarketPrice/CateMarketPrice/sagas'),
          import('containers/NewsManager_v2/MarketPrice/CateMarketPrice'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('cateMarketPrice', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/marketprice/:id_cate_news',
          name: 'listMarketPrice',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              import('containers/NewsManager_v2/MarketPrice/ListMarketPrice/reducer'),
              import('containers/NewsManager_v2/MarketPrice/ListMarketPrice/sagas'),
              import('containers/NewsManager_v2/MarketPrice/ListMarketPrice'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('listMarketPrice', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        }, 
      ]
    },{
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
