import { all } from "redux-saga/effects";
import { authSaga } from "./auth";

// function* 제네릭터함수
export default function* rootSaga() {
  //   all을 실행하면서 안에 배열로 하위사가를 가져와야함 ./auth.ts
  yield all([authSaga()]);
}
