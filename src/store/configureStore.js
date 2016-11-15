import {createStore, applyMiddleware, combineReducers, compose} from 'redux';

const rootReducer = combineReducers({root: () => ''});
const env = process.env.NODE_ENV;
export default function configureStore(initialState = {}) {
  let enhancer = applyMiddleware({});
  if (env === 'development') {
    const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
    enhancer = compose(applyMiddleware({}), devTools);
  }
  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
}
