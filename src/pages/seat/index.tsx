"use client";

import Link from "next/link"

import { Toaster } from "@/components/ui/sonner"

import StructureSchoolPreview from "@/components/common/SchoolPreview";
import { useState, useEffect } from "react";
import Image from "next/image";

import {
  createCall,
  createCallParticipant,
  deactivateCall,
  getAvailablePositions,
  getCallParticipants,
  getMyCalls,
  getStats,
} from "@/utils/call";
import { promises } from "dns";
import { useRouter } from "next/router";

interface Props {
  callId: string;
}

const PickSeat : React.FC<Props> = ({callId}) => {
  const [chairsAvailable, setChairsAvailable] = useState(32);
  const [availableSeats, setAvailableSeats] = useState<number[]>([]);

  console.log({ callId });

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const seats = await getAvailablePositions(callId);
        setAvailableSeats(seats); 
      } catch (error) {
        console.error('Error fetching available seats:', error);
      }
    };

    fetchAvailableSeats();
  }, [callId]);

  const chooseChoose = () => {
    
  }
  
  // const renderChairs = () => {
  //   const chairs = [];

  //   for (let i = 0; i < chairsAvailable; i++) {

  //     const isAvailable = availbleseat.includes(i);
  //     chairs.push(
  //       <div
  //         key={i}
  //         className={`w-7 h-7 border rounded-sm flex items-center justify-center hover:opacity-40 available_chair ${isAvailable ? "available_chair_success" : "chosen_chair"}`}
  //       >
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           className="w-4 h-4"
  //           viewBox="0 0 24 24"
  //           style={{ msFilter: "" }}
  //           fill="currentColor"
  //         >
  //           <path d="M19 13V4c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2v9a1 1 0 00-1 1v8h2v-5h12v5h2v-8a1 1 0 00-1-1zm-2-9v9h-2V4h2zm-4 0v9h-2V4h2zM7 4h2v9H7V4z"></path>
  //         </svg>
  //       </div>
  //     );
  //   }
  //   return chairs;
  // };

  return (
    <>
      <div>
        <div className="cr_container flex flex-col">
          <div className="cr_child circle-red"></div>
          <div className="cr_child circle-blue"></div>
        </div>
      </div>
      <div className="w-full h-screen min-h-screen flex flex-col items-center justify-center overflow-hidden _Container p-6">
        <div className="flex flex-col md:flex-row justify-center gap-y-6 md:gap-y-0 gap-x-8 w-full py-20">
          <div className="pr-10 max-w-sm">
            <h2 className="text-4xl font-bold">
              Select a seat
            </h2>
            <p className="mt-4 text-base">
                Select an available seat to fully immerse yourself in the class experience.
            </p>
            <div className="flex">
                <div className="grid grid-cols-5 mt-5 gap-3">
                    {/* {renderChairs()} */}
                </div>
            </div>
          </div>
          <div className="max-w-sm flex-1">
            <section className="w-full flex flex-row justify-center gap-3">
              <Image src="/avatar/default-0.png" width={300} height={200} className="w-[110px]" alt="avatar" />
              <Image src="/avatar/default-1.png" width={300} height={200} className="w-[110px]" alt="avatar" />
            </section>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default PickSeat;
