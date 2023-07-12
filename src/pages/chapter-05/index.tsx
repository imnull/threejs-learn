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

export default () => {
    return <>
        <h1>Loading 3D by JSX</h1>
        <ThreeRenderer antialias>
            <OrbitControls enableDamping />
            <PerspectiveCamera fov={45} />
            <Scene>
                <Color color={0xbfe3dd} />
                <Environment sigma={0.1} />
            </Scene>
            <Resource>
                <ResourceLoader type="gltf" uri="/assets/models/DamagedHelmet.gltf" scale={[8, 8, 8]} position={[0, 0, 0]} />
            </Resource>
        </ThreeRenderer>
    </>
}