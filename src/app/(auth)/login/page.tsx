"use client";
import React from "react";
import { signIn } from "next-auth/react";

function Login() {
  const email = React.useRef("");
  const password = React.useRef("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/",
    });
    console.log(result);
    console.log(email.current);
    console.log(password.current);
  };
  return (
    <div className="flex flex-col">
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded text-black"
          onChange={(e) => {
            email.current = e.target.value;
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded text-black"
          onChange={(e) => {
            password.current = e.target.value;
          }}
        />
        <button
          type="submit"
          onClick={onSubmit}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
