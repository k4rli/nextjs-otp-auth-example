import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_REDIRECT_PATH, SESSION_COOKIE_NAME } from "./constants";
import AuthStorage from "./AuthStorage";

type ProtectedComponent = () => Promise<JSX.Element> | JSX.Element;

const withValidatedSessionId = async (protectedComponent: ProtectedComponent) => {
  const sessionIdCookieValue = cookies().get(SESSION_COOKIE_NAME)?.value;

  if (!sessionIdCookieValue || !(await AuthStorage.isValidSessionId(sessionIdCookieValue))) {
    redirect(LOGIN_REDIRECT_PATH);
  }

  return protectedComponent;
}

export default withValidatedSessionId;
