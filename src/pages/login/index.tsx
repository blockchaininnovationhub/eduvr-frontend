"use client";

import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/useLogin";
import { useEffect } from "react";

const Login = () => {
  const { login, isLoading, error, message } = useLogin();

  return (
    <>
      <div>
        <div className="cr_container flex flex-col">
          <div className="cr_child circle-red"></div>
          <div className="cr_child circle-blue"></div>
        </div>
      </div>
      <div className="w-full h-screen min-h-screen flex flex-col items-center justify-center overflow-hidden _Container p-6">
        <div className="flex flex-col md:flex-row justify-center gap-y-6 md:gap-y-0 gap-x-8 w-full">
          <div className="pr-10 max-w-sm">
            <h2 className="text-4xl font-bold">
              Connect to virtual <br /> EduVr classroom
            </h2>
            <p className="mt-4 text-base">
              if you don't have an account you can <a>register here</a>
            </p>
          </div>
          <div className="pr-10">lorem ipsum dolor sit amet</div>
          <div className="max-w-sm flex-1">
            <div>
              {isLoading ? (
                <Button>Loading...</Button>
              ) : (
                <Button onClick={login}>Submit</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
