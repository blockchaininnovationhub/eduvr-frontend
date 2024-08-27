"use client";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import useSignup from "@/hooks/useSignup";

const Signup = () => {
  const { signup, isLoading, error, message } = useSignup();

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
              Join 3d virtual <br /> EduVr class
            </h2>
            <p className="mt-4 text-base">
              if you don't have an account you can <a>register here</a>
            </p>
          </div>
          <div className="max-w-sm flex-1">
            <div>
              <Button onClick={signup} type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
