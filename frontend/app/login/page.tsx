"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(`https://server1.varuntd.com/api/user/login`, {
        email,
        password,
        role,
      });

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="mt-52 bg-white border border-gray-200 rounded-xl shadow-sm w-96">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 ">
                Sign in
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Dont have an account yet?
                <a
                  className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Sign up here
                </a>
              </p>
            </div>

            <div className="mt-5">
              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t">
                Or
              </div>

              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label className="block text-sm mb-2">Email address</label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="py-3 px-4 block w-full border border-gray-900 rounded-lg text-sm "
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <label className="block text-sm mb-2">Password</label>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        className="py-3 px-4 block w-full border border-gray-900 rounded-lg text-sm"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">User Type</label>
                    <div className="flex items-center">
                      <label className="mr-4">
                        <input
                          type="radio"
                          value="user"
                          checked={role === "user"}
                          onChange={(e) => setRole(e.target.value)}
                        />
                        User
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="admin"
                          checked={role === "admin"}
                          onChange={(e) => setRole(e.target.value)}
                        />
                        Admin
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center"></div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
