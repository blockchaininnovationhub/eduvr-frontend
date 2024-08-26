import SchoolCav from "@/components/SchoolCanvas";
import { Button } from "@/components/ui/button"

import { Toaster } from "@/components/ui/sonner"

import CreateClassroom from "@/components/CreateClassroom"
import JoinClassroom from "@/components/JoinClassroom"
import HeroNav from "@/components/HeroNav";

const Homepage = () => {   
    return(
        <>
          <div>
            <div>
              <div className="cr_container flex flex-col">
                  <div className="cr_child circle-red"></div>
                  <div className="cr_child circle-blue"></div>
                </div>
            </div>
            <HeroNav />
          </div>
          <section className="w-full flex flex-col items-center justify-center py-6 mt-2">
            <div className="max-w-xl">
              <div className="text-center flex flex-col gap-y-2 mt-4">
                <h1 className="text-5xl font-semibold text-slate-800">Connect to 3D classroom for everyone</h1>
                <p className="text-2xl text-slate-700 py-2">Connect, interact, and learn from any location with EduVR.</p>
              </div>
              <div className="mt-4 text-center flex flex-row gap-x-3 justify-center">
                <CreateClassroom />
                <JoinClassroom />
              </div>
            </div>
          </section>
          <Toaster />
          <section className="w-full flex justify-center">
            <div className="w-full h-[600px]">
              <SchoolCav />
            </div>
          </section>
        </>
    );
}

export default Homepage;