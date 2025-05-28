
import { LoginForm } from "@/components/LoginForm";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    // console.log(user);
    if (user && token) {
      navigate(`/${user.role}`);
    }
  }, [user, token, navigate]);

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
       
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
