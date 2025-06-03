import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FormComponent from "./Form/FormComponent";
import { FieldValues, SubmitHandler } from "react-hook-form";
import FormInput from "./Form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "@/schema/authValidationSchema";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { ILoginResponse, TResponseRedux } from "@/types";
import { useAppDispatch } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/assets/logos/Logo";

interface ILoginProps {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const [defaultValues, setDefaultValues] = useState<ILoginProps>({
    email: "tamimmahmud0@gmail.com",
    password: "123456789",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingId = toast.loading("Logging in...");
    try {
      const res = (await login(data)) as TResponseRedux<ILoginResponse>;
      if (res.data?.success) {
        const user = verifyToken(res.data.data.token) as TUser;
        dispatch(
          setUser({
            user,
            token: res.data.data.token,
          })
        );
        toast.success("Login success.", { id: loadingId });
        return;
      }
      toast.error(
        res.error?.data.message || "Something went wrong while logging you in.",
        { id: loadingId }
      );
    } catch {
      toast.error("Something went wrong while logging you in.", {
        id: loadingId,
      });
    }
  };

  const handleAdmin = () => {
    const adminValues = {
      email: "admin@gmail.com",
      password: "123456789",
    };
    setDefaultValues(adminValues);
    onSubmit(adminValues);
  };

  const handleUser = () => {
    const userValues = {
      email: "tamimmahmud0@gmail.com",
      password: "123456789",
    };
    setDefaultValues(userValues);
    onSubmit(userValues);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between">
            Login
            <div className="logo">
              <Link to={"/"}>
                <Logo height={100} width={100} />
              </Link>
            </div>
          </CardTitle>
          //some code added  some code and add some code added 

          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormComponent
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
            defaultValues={defaultValues}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <FormInput
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <a
                    href="#"
                    className="inline-block ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <FormInput name="password" type="password" />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-sm text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </FormComponent>
          <div className="grid grid-cols-1 gap-2 mt-4 lg:grid-cols-2 md:grid-cols-2">
            <Button onClick={() => handleAdmin()} className="w-full">
              Admin Login
            </Button>
            <Button onClick={() => handleUser()} className="w-full">
              User Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
