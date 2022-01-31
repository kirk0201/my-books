import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./modules/reducer";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./modules/rootSaga";
import { routerMiddleware } from "connected-react-router";
import history from "../history";
import TokenService from "../services/TokenService";

const create = () => {
  const token = TokenService.get();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer(history),
    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );
  //   sagaMiddleware는 store를 리턴하기 전에 인자에 rootSaga를 넣어야함
  sagaMiddleware.run(rootSaga);
  return store;
};

export default create;
