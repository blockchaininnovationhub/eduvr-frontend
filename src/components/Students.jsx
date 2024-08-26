import { useGLTF } from "@react-three/drei";
import React, { useMemo } from "react";
import { useEffect } from "react";

export const genders = ["male", "female"];

export const Students = ({ gendersex }) => {
    const { scene, nodes } = useGLTF(`/models/${gendersex}.glb`);

    useEffect(() => {
        if (nodes) {
            if(gendersex == "male") {
                const hips = nodes.Hips_66;
                const leftLeg = nodes.LeftLeg_59;
                const rightLeg = nodes.RightLeg_64;
                const body = nodes.Spine_55;

                if (hips) hips.rotation.set(-Math.PI / 2, 0, 0);
                if (leftLeg) leftLeg.rotation.set(-Math.PI / 2, 0, 0);
                if (rightLeg) rightLeg.rotation.set(-Math.PI / 2, 0, 0);
                if(body) body.rotation.set(Math.PI / 2, 0, 0);
            }
            else if(gendersex == "female") {
                const hips = nodes.J_Bip_C_Hips_031;
                const leftLeg = nodes.J_Bip_L_LowerLeg_0119;
                const rightLeg = nodes.J_Bip_R_LowerLeg_0130;
                const body = nodes.J_Bip_C_Spine_032;

                if (hips) hips.rotation.set(-Math.PI / 2, 0, 0);
                if (leftLeg) leftLeg.rotation.set(-Math.PI / 2, 0, 0);
                if (rightLeg) rightLeg.rotation.set(-Math.PI / 2, 0, 0);
                if(body) body.rotation.set(Math.PI / 2, 0, 0);
            }
            else{
                // Transgender code goes here
            }
        }
    }, [nodes]);


    const positions = [
        [0, -1.7, 0], 
        [1.6, -1.7, 0],  
        [3.2, -1.7, 0], 
        [-1.6, -1.7, 0], 
        [-3.2, -1.7, 0], 
    ];

    const models = useMemo(() => {
        return positions.map((position) => scene.clone(true));  // true for deep clone
    }, [positions, scene]);

    return (
        <group position={[0.08, -2.1, 0.52]} rotation={[0, Math.PI, 0]}>
            <primitive object={scene} />
        </group>
    );

    // return (
    //     <>
    //         {models.map((model, index) => (
    //             <group
    //                 key={index}
    //                 position={positions[index]}
    //                 rotation={[0, Math.PI, 0]}
    //             >
    //                 <primitive object={model} />
    //             </group>
    //         ))}
    //     </>
    // );
};

// Preload models to optimize loading
genders.forEach((gendersex) => {
    useGLTF.preload(`/models/${gendersex}.glb`);
});
