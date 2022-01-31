import { Action, createActions, handleActions } from "redux-actions";
import { call, put, takeEvery } from "redux-saga/effects";
import history from "../../history";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { LoginReqType } from "../../types";

// Auth상태 구상
interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};
// 리덕스-사가? 리덕스-액션즈? 네이밍 컨벤션
const prefix = "my-books/auth";

// createActions를 이용해 액션함수
// peding, success,fail => 액션함수
// "PENDING", "SUCCESS", "FAIL" => 액션
export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

// handleActions첫번째 인자로 위에 적힌 액션타입
const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    // token을 받아야 하기 때문에 action이 필요
    SUCCESS: (state, action) => ({
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

// saga
export const { login, logout } = createActions("LOGIN", "LOGOUT", { prefix });
function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    // localstorage
    TokenService.set(token);

    yield put(success(token));
    // push
    // yield put();
    history.replace("/");
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || "UNKNOWN ERROR")));
  }
}
function logoutSaga() {}
export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
