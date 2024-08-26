"use client";
import { CameraControls, Environment, Gltf, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Students } from './Students';  
import { Teacher } from "./Teacher";
import { degToRad } from "three/src/math/MathUtils";
import { Navbar } from "./Nav";
import { Board } from "./Board";

const Classroom = () => {
    return(
        <>
            <div className="w-12 z-10 h-full right-10 fixed bottom-0 flex flex-col">
                <Navbar />
            </div>
            <Canvas
                camera={{ 
                    position: [0, 0, 2.5]
                }}
            >
                <CameraManager />
                <Environment preset="sunset" />
                <Html 
                    position={[0.045, -0.035, -3]} 
                    transform 
                    distanceFactor={1.305} 
                    zIndexRange={[0, -1]}
                    occlude={false}
                    followCamera={false}
                >
                    <Board />
                </Html>
                <ambientLight intensity={0.8} color="black" />
                <Teacher teacher={"Naoki"} position={[-2.4, -1.7, -1]} />
                <Students gendersex="male" />
                <Gltf src="/models/japanese_classroom.glb" position={[4.2, -1.7, -1.5]} rotation={[0, Math.PI / 2, 0]} />
            </Canvas>
        </>
    );
}

const CameraManager = () => {
    return <CameraControls 
        minZoom={1}
        maxZoom={3}
        polarRotateSpeed={-0.3}
        azimuthRotateSpeed={-0.3}
        minPolarAngle={degToRad(60)}   // Restrict upward movement
        maxPolarAngle={degToRad(120)}  // Restrict downward movement
        minAzimuthAngle={degToRad(-90)}  // Restrict leftward movement
        maxAzimuthAngle={degToRad(90)}   // Restrict rightward movement
        mouseButtons={{
            left: 1,
            right: 2,
            wheel: 16,
        }}
    />;
}


export default Classroom;