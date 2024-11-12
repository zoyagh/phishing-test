import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "components";
import { getCookie } from "libraries/cookie";
import { useAppSelector } from "libraries/redux";
import { ERoutePaths } from "types/";
import { AuthSelectors } from "store/auth/selectors";

import styles from "./Error.module.scss";

const Error: FC = () => {
  const navigate = useNavigate();

  const { signIn } = useAppSelector(AuthSelectors.authSystem);
  const isAuthenticatedCookie = getCookie("token") !== undefined;

  const isAuth = isAuthenticatedCookie || Boolean(signIn?.data?.access_token);

  const routeHandler = () => {
    navigate(isAuth ? ERoutePaths.Home : ERoutePaths.LogIn);
  };

  return (
    <div className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>Route does not exist</h2>
      <Button onClick={routeHandler} className={styles.routeButton}>
        Go to {isAuth ? "Home" : "Login"} Page
      </Button>
    </div>
  );
};

export default Error;
