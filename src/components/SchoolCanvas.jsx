"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from './CanvasLoader';
import { angleToRadians } from "../utils/angleToRadians";
import { M_PLUS_1 } from "next/font/google";

const SchoolCanvas = () => {
    const school = useGLTF('/models/snow/colourd_scene.glb');
    return (
        <mesh>
            <Environment preset="sunset" />
            <hemisphereLight intensity={0.15} groundColor="red" />
            <pointLight intensity={1} />
            <primitive 
                object={school.scene}
                scale={12}
                rotation={[angleToRadians(5), 0.7, 0]}
                // position={[0, -0.5, 0]}
            />
        </mesh>
    );
}

const SchoolCav = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [0, 1.8, -2]}}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 3}
                    minPolarAngle={Math.PI / 3}
                />
                <SchoolCanvas />
            </Suspense>
            <Preload all />
        </Canvas>
    );
}

export default SchoolCav;
