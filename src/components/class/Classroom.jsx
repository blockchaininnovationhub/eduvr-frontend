"use client";
import { CameraControls, Environment, Html, Preload } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Students } from '@/components/class/Students';  
import { Teacher } from "../Teacher";
import { degToRad } from "three/src/math/MathUtils";
import { Navbar } from "@/components/Nav";
import { Board } from "./Board";
import ClassRooomStructure from "./ClassStructure";
import { Suspense, useState } from "react";
import CanvasLoader from "../CanvasLoader";
import { Toaster } from "sonner";

const Classroom = () => {
    const Camerapositions = [
        [-3.2, 0, 0.55], [-1.6, 0, 0.55], [-0.04, 0, 0.55], [1.6, 0, 0.55], [3.2, 0, 0.55], [3.2, 0, 0.55],
        [-3.2, 0, 2.25], [-1.6, 0, 2.25], [-0.04, 0, 2.25], [1.6, 0, 2.25], [3.2, 0, 2.25], [3.2, 0, 2.25],
        [-3.2, 0, 4], [-1.6, 0, 4], [-0.04, 0, 4], [1.6, 0, 4], [3.2, 0, 4], [3.2, 0, 4],
        [-3.2, 0, 5], [-1.6, 0, 5], [-0.04, 0, 5], [1.6, 0, 5], [3.2, 0, 5], [3.2, 0, 5],
        [-3.2, 0, 30], [-1.6, 0, 6], [-0.04, 0, 6], [1.6, 0, 6], [3.2, 0, 6], [3.2, 0, 6],
    ];

    const [seatVal, setSeatVal] = useState(4);
    
    return(
        <>
                <div className="w-12 z-10 h-full right-10 fixed bottom-0 flex flex-col">
                    <Navbar />
                </div>
                <Canvas
                    camera={{ 
                        position: [0, 0, -3], // Default to first position
                    }}
                >
                    <Suspense fallback={<CanvasLoader />}>
                        <CameraManager />
                        <Environment files="/preset/adams_place_bridge_1k.hdr" />
                        <Students />
                        <Html 
                            position={[-0.0793, 0.175, -3]} 
                            transform 
                            distanceFactor={1.25} 
                            zIndexRange={[0, -1]}
                            occlude={false}
                            followCamera={false}
                        >
                            <Board />
                        </Html>
                        <ambientLight intensity={0.5} color="black" />
                        <ClassRooomStructure position={[4.1, -1.5, -1.5]} rotation={[0, Math.PI / 2, 0]} />
                    </Suspense>
                    <Preload all />
                </Canvas> 
                <Toaster />
        </>
    );
}

const CameraManager = () => {
    return <CameraControls 
        minZoom={1}
        maxZoom={6}
        polarRotateSpeed={-0.3}
        azimuthRotateSpeed={-0.3}
        minPolarAngle={degToRad(80)}  
        maxPolarAngle={degToRad(95)}
        // minAzimuthAngle={degToRad(-90)} 
        // maxAzimuthAngle={degToRad(90)}  
        mouseButtons={{
            left: 1,
            right: 2,
            wheel: 16,
        }}
        smoothTime={0.1}
    />;
}

export default Classroom;