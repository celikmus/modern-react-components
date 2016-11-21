import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({root: () => ''});
const env = process.env.NODE_ENV;
export default function configureStore(initialState = {}) {
  let enhancer = applyMiddleware(thunk);
  if (env === 'development') {
    const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
    enhancer = compose(applyMiddleware(thunk), devTools);
  }
  return createStore(
    rootReducer,
    initialState,
    enhancer
  );
}
