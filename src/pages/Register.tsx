import { RegisterForm } from "@/components/RegisterForm";

const Register = () => {
    return (
        <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm />
            </div>
        </div>
    );
};

export default Register;