"use client";
import { CameraControls, Environment, Html } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Students } from "./Students";
import { Teacher } from "../Teacher";
import { degToRad } from "three/src/math/MathUtils";
import { Navbar } from "../Nav";
import { StudentBoard } from "./StudentBoard";
import ClassRooomStructure from "@/components/class/ClassStructure";
import { useState } from "react";

const Classroom = () => {
  const Camerapositions = [
    [-3.2, 0, 0.55],
    [-1.6, 0, 0.55],
    [-0.04, 0, 0.55],
    [1.6, 0, 0.55],
    [3.2, 0, 0.55],
    [3.2, 0, 0.55],
    [-3.2, 0, 2.25],
    [-1.6, 0, 2.25],
    [-0.04, 0, 2.25],
    [1.6, 0, 2.25],
    [3.2, 0, 2.25],
    [3.2, 0, 2.25],
    [-3.2, 0, 4],
    [-1.6, 0, 4],
    [-0.04, 0, 4],
    [1.6, 0, 4],
    [3.2, 0, 4],
    [3.2, 0, 4],
    [-3.2, 0, 5],
    [-1.6, 0, 5],
    [-0.04, 0, 5],
    [1.6, 0, 5],
    [3.2, 0, 5],
    [3.2, 0, 5],
    [-3.2, 0, 30],
    [-1.6, 0, 6],
    [-0.04, 0, 6],
    [1.6, 0, 6],
    [3.2, 0, 6],
    [3.2, 0, 6],
  ];

  const [seatVal, setSeatVal] = useState(2);

  return (
    <>
      <div className="w-12 z-10 h-full right-10 fixed bottom-0 flex flex-col">
        <Navbar />
      </div>
      <Canvas
        camera={{
          position: Camerapositions[seatVal] || [-3.2, 0, 0.55], // Default to first position
        }}
      >
        {/* <OrbitControls /> */}
        <CameraManager />
        <Environment preset="sunset" />
        <Students />
        <Html
          position={[-0.0793, 0.175, -3]}
          transform
          distanceFactor={1.25}
          zIndexRange={[0, -1]}
          occlude={false}
          followCamera={false}
        >
          <StudentBoard />
        </Html>

        <ambientLight intensity={0.8} color="black" />
        <ClassRooomStructure
          position={[4.1, -1.5, -1.5]}
          rotation={[0, Math.PI / 2, 0]}
        />
      </Canvas>
    </>
  );
};

const CameraManager = () => {
  return (
    <CameraControls
      minZoom={1}
      maxZoom={3}
      polarRotateSpeed={-0.3}
      azimuthRotateSpeed={-0.3}
      minPolarAngle={degToRad(70)}
      maxPolarAngle={degToRad(95)}
      minAzimuthAngle={degToRad(-90)}
      maxAzimuthAngle={degToRad(90)}
      mouseButtons={{
        left: 1,
        right: 2,
        wheel: 16,
      }}
      smoothTime={0.1}
    />
  );
};

export default Classroom;
