"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Register = () => {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthStateType>({
    email: "",
    password: "",
    name: "",
    username: "",
    password_confirmation: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthState({ ...authState, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AuthErrorType>();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/register", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status === 200) {
          router.push(`/login?message=${response.message}`);
        } else if (response.status === 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The error is", err);
      });
  };

  return (
    <div className="">
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image src="/images/logo.svg" width={50} height={50} alt="Logo" />
          </div>
          <h1 className="text-2xl font-bold">Register</h1>
          <p>Welcome to threads</p>
          <form onSubmit={submit}>
            <div className="mt-5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={(e) => handleOnChange(e)}
              />
              <span className="text-red-400 font-bold">{errors?.name}</span>
            </div>
            <div className="mt-5">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                onChange={(e) => handleOnChange(e)}
              />
              <span className="text-red-400 font-bold">{errors?.username}</span>
            </div>
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
              <Label htmlFor="confirmpassword">Confirm Password</Label>
              <Input
                type="password"
                name="password_confirmation"
                id="confirmpassword"
                placeholder="Enter Password"
                onChange={(e) => handleOnChange(e)}
              />
            </div>

            <div className="mt-5">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "Processing..." : "Register"}
              </Button>
            </div>
          </form>
          <div className="mt-5">
            <span>
              Already have an account?
              <Link href="/login" className="text-orange-400 ml-2">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;