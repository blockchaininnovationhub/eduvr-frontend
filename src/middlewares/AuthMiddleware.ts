import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { getProfile } from "@/utils/call";

interface AuthMiddlewareProps {
  children: ReactNode;
}
const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      const profile = await getProfile();

      if (profile === null) {
        router.push("/login");
      }
    };

    checkProfile();
  }, [router]);

  return children;
};

export default AuthMiddleware;
