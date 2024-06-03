import LoginForm from "./form";
import { login } from "./actions";

export default function Login() {
  return <LoginForm loginForm={login} />;
}
