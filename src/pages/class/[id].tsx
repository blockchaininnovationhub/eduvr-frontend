import Classroom from "@/components/class/Classroom";
import StudentClassroom from "@/components/class/StudentClassroom";
import useLoading from "@/hooks/useLoading";
import AuthMiddleware from "@/middlewares/AuthMiddleware";
import { CallProps } from "@/types";
import { getCall, getProfile } from "@/utils/call";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

const Class = () => {
  const router = useRouter();
  const { id } = router.query;

  const [call, setCall] = useState<CallProps>({});
  const [profile, setProfile] = useState<any>({});
  const { isLoading, stopLoading } = useLoading(true);

  console.log("hjgjhghhjg")

  const isTeacher = useMemo(() => {
    if (profile && call) {
      return profile._id == call.user;
    }
    return false;
  }, [profile, call]);

  useEffect(() => {
    if (!id) return;

    let _id: string;

    if (typeof id === "object") {
      _id = id[0];
    } else {
      _id = id;
    }

    const _getCall = async () => {
      const call: CallProps = await getCall(_id);
      setCall(call ?? {});
    };

    const _getProfile = async () => {
      const profile = await getProfile();
      setProfile(profile ?? {});
    };

    const _execute = async () => {
      await _getCall();
      await _getProfile();
      stopLoading();
    };

    _execute();
  }, [id]);

  return (
    !isLoading && (
      <main className="w-full h-screen min-h-screen">
        <p>{id}</p>
        {isTeacher ? (
          <AuthMiddleware>
            {" "}
            <Classroom />
          </AuthMiddleware>
        ) : (
          <StudentClassroom />
        )}
      </main>
    )
  );
};

export default Class;
