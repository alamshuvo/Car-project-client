import { LoginForm } from "@/components/LoginForm";

const Login = () => {
    return (
        <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
};

export default Login;