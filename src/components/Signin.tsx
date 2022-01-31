import { Button, Col, Input, Row } from "antd";
import { useRef } from "react";
import { LoginReqType } from "../types";
import styles from "./Signin.module.css";

/* 
/src/types.ts
다른곳에서 사용할수 있기에 따로 뺴줌
*/
// type LoginReqType = {
//   email: string;
//   password: string;
// };

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

/* 
export default function Signin()에서 props를 받기위해
React.FC<SigninProps> = ({})
위에 SigninProps의 형태와 Signin에 들어온 props에 형태는
children을 제외하고 같아지게 된다.
 */
const Signin: React.FC<SigninProps> = ({ login }) => {
  const emailRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  return (
    <Row align="middle" className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}>
            <img className={styles.signin_bg} src="bg_signin.png" alt="bg" />
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>
              Please Note Your Opinion
            </div>
            <div className={styles.underline} />
            <div className={styles.email_title}>
              Email
              <span className={styles.required}>*</span>
            </div>
            <Input
              className={styles.input_area}
              placeholder="Email"
              autoComplete="email"
              name="email"
              ref={emailRef}
            ></Input>
            <div className={styles.email_password}>
              Password
              <span className={styles.required}>*</span>
            </div>
            <Input
              ref={passwordRef}
              className={styles.input_area}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              name="password"
            ></Input>
            <div className={styles.button_area}>
              <Button
                size="large"
                className={styles.signin_button}
                onClick={click}
              >
                SIGN IN
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );

  function click() {
    const email = emailRef.current!.state.value;
    const password = passwordRef.current!.state.value;

    login({ email, password });
  }
};
export default Signin;
