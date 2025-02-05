import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import FormComponent from "./Form/FormComponent"
import { FieldValues, SubmitHandler } from "react-hook-form"
import FormInput from "./Form/FormInput"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerValidationSchema } from "@/schema/authValidationSchema"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const defaultValues = {
    email: '',
    password: '',
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormComponent
            onSubmit={onSubmit}
            resolver={zodResolver(registerValidationSchema)}
            defaultValues={defaultValues}>


            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <FormInput
                  name="name"
                  type="text"
                  placeholder="john doe"
                />
              </div>

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
                Create Account
              </Button>
            </div>
            <div className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </FormComponent>
        </CardContent>
      </Card>
    </div>
  )
}
