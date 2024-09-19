"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<AuthErrorType>();
  const [authState, setAuthState] = useState<AuthStateType>({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthState({ ...authState, [e.target.name]: e.target.value });
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("api/auth/login", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status === 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status === 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("error is", err);
      });
  };

  return (
    <div className="">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image src="/images/logo.svg" width={50} height={50} alt="Logo" />
          </div>
          {searchParams.get("message") ? (
            <div className="bg-green-400 p-2 rounded-lg my-2 text-center">
              <strong>Success!!</strong>
              <span className="ml-2">{searchParams.get("message")}</span>
            </div>
          ) : (
            <></>
          )}
          <h1 className="text-2xl font-bold">Login</h1>
          <p>Welcome</p>
          <form onSubmit={submit}>
            <div className="mt-5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your Email"
                onChange={(e) => handleOnChange(e)}
              />
              <span className="text-red-400 font-bold">{errors?.email}</span>
            </div>
            <div className="mt-5">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => handleOnChange(e)}
              />
              <span className="text-red-400 font-bold">{errors?.password}</span>
            </div>
            <div className="mt-5">
              <Button className="w-full" type="submit">
                {loading ? "Processing..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="mt-5">
            <span>
              Don&apos;t have an account?
              <Link href="/register" className="text-orange-400 ml-2">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
