import React, { useEffect, useState } from "react";
import "./index.scss"

import {
    ThreeRenderer,
    OrbitControls,
    PerspectiveCamera,
    Scene,
    Color,
    Environment,
    Resource,
    ResourceLoader,
} from "~/three-jsx"
import { GLTF } from "~/three-addons/loaders/GLTFLoader";

export default () => {

    return <>
        <h1>Animation</h1>
        <ThreeRenderer antialias>
            <OrbitControls enableDamping target={[0, 0.5, 0]} />
            <PerspectiveCamera fov={40} position={[5, 2, 8]} near={1} far={100} />
            <Scene>
                <Color color={0xbfe3dd} />
                <Environment />
            </Scene>
            <Resource>
                <ResourceLoader
                    type="gltf"
                    uri="assets/models/LittlestTokyo/LittlestTokyo.gltf"
                    scale={[0.03, 0.03, 0.03]}
                    position={[1, 1, 0]}
                />
            </Resource>
        </ThreeRenderer>
    </>
}