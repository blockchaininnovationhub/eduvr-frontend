import React, { useMemo } from "react";
import MaleCharacter from "@/pages/class/Male";
import FemaleCharacter from "@/pages/class/Female";
import Character from "@/pages/dashboard/data/Participant.json";

export const Students = () => {
    const positions = [
        [-3.2, -1.91, 0.55], [-1.6, -1.91, 0.55], [-0.04, -1.91, 0.55], [1.6, -1.91, 0.55], [3.2, -1.91, 0.55], [3.2, -1.91, 0.55],
        [-3.2, -1.91, 2.25], [-1.6, -1.91, 2.25], [-0.04, -1.91, 2.25], [1.6, -1.91, 2.25], [3.2, -1.91, 2.25], [3.2, -1.91, 2.25],
        [-3.2, -1.91, 4], [-1.6, -1.91, 4], [-0.04, -1.91, 4], [1.6, -1.91, 4], [3.2, -1.91, 4], [3.2, -1.91, 4],
        [-3.2, -1.91, 5], [-1.6, -1.91, 5], [-0.04, -1.91, 5], [1.6, -1.91, 5], [3.2, -1.91, 5], [3.2, -1.91, 5],
        [-3.2, -1.91, 6], [-1.6, -1.91, 6], [-0.04, -1.91, 6], [1.6, -1.91, 6], [3.2, -1.91, 6], [3.2, -1.91, 6],
    ];

    // Cache the components using useMemo to avoid re-loading of models
    const cachedComponents = useMemo(() => {
        return {
            male: <MaleCharacter />,
            female: <FemaleCharacter />,
        };
    }, []);

    return (
        <>
            {Character.map((data, index) => {
                const characterPosition = positions[index] || [0, 0, 0]; // Ensure each character has a unique position
                const componentToRender =
                    data.avatar === 0
                        ? cachedComponents.male
                        : data.avatar === 1
                        ? cachedComponents.female
                        : null;

                return componentToRender ? (
                    <React.Fragment key={index}>
                        {React.cloneElement(componentToRender, {
                            position: characterPosition,
                            rotation: [0, Math.PI, 0],
                        })}
                    </React.Fragment>
                ) : (
                    <React.Fragment key={index}>null</React.Fragment>
                );
            })}
        </>
    );
};
