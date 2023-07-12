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

    const [gltf, setGLTF] = useState<GLTF | null>(null)

    useEffect(() => {
        if(!gltf) {
            return
        }
        
        let a = 0
        const h = setInterval(() => {
            a = (a + 1) % 360
            const x = Math.sin(a * (Math.PI / 180)) * 10
            const y = Math.cos(a * (Math.PI / 180)) * 10
            gltf.scene.position.set(x, 0, y)
            gltf.scene.rotateX(Math.PI / 180)
        }, 30)

        return () => {
            clearInterval(h)
        }
    }, [gltf])

    return <>
        <h1>Loading 3D by JSX</h1>
        <ThreeRenderer antialias>
            <OrbitControls enableDamping />
            <PerspectiveCamera fov={45} />
            <Scene>
                <Color color={0xbfe3dd} />
                <Environment />
            </Scene>
            <Resource>
                <ResourceLoader
                    type="gltf"
                    uri="/assets/models/DamagedHelmet.gltf"
                    scale={[8, 8, 8]}
                    position={[0, 0, 0]}
                    onLoad={gltf => {
                        setGLTF(gltf)
                    }}
                />
            </Resource>
        </ThreeRenderer>
    </>
}