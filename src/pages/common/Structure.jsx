"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from '@/components/CanvasLoader';
import { angleToRadians } from "@/utils/angleToRadians";
import StructureSchool from "@/pages/common/Calligraphy_school";

const LayoutCanvas = () => {
    return (
        <mesh>
            <Environment preset="sunset" />
            <hemisphereLight intensity={0.15} groundColor="black" />
            <pointLight intensity={1} />
            <StructureSchool rotation={[-angleToRadians(10), angleToRadians(180), 0]} position={[0, -0.36, 0.01]} />
        </mesh>
    );
}

const SchoolCav = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [0, 0, -1.72]}}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={angleToRadians(90)}
                    minPolarAngle={angleToRadians(40)}
                    minAzimuthAngle={angleToRadians(0)}
                    maxAzimuthAngle={angleToRadians(270)}
                />
                <LayoutCanvas />
            </Suspense>
            <Preload all />
        </Canvas>
    );
}

export default SchoolCav;
