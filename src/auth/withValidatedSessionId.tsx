import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_REDIRECT_PATH, SESSION_COOKIE_NAME } from "./constants";
import AuthStorage from "./AuthStorage";

const withValidatedSessionId = (ProtectedComponent: (props: any) => JSX.Element) => {
  return async function WithValidatedSessionId(props: any) {
    const sessionIdCookieValue = cookies().get(SESSION_COOKIE_NAME)?.value;

    if (!sessionIdCookieValue || !(await AuthStorage.isValidSessionId(sessionIdCookieValue))) {
      redirect(LOGIN_REDIRECT_PATH);
    }

    return <ProtectedComponent {...props} />;
  };
}

export default withValidatedSessionId;
