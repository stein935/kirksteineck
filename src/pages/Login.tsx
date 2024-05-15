import Button from "../components/Button";
import firebase from "../utilities/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Login = () => {
  const [user] = useAuthState(firebase.auth);
  console.log(user);
  return (
    <>
      <div className="prose h-dvh w-screen max-w-none ">
        <div className="m-auto w-1/2 pt-40">
          {user ? (
            <>
              <h1>Hello, {user?.displayName}</h1>
              <Button onClick={firebase.googleLogout}>Log out</Button>
            </>
          ) : (
            <Button onClick={firebase.signInWithGoogle}>
              Sign In with Google
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
