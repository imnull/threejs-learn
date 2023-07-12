import React, { useEffect, useState } from "react"
import OrbitControls, {
    name as OrbitControlsName,
    parse as parseOrbitControlsProps,
    get as getOrbitControls,
} from "./orbit-controls"
import PerspectiveCamera, {
    name as PerspectiveCameraName,
    parse as parsePerspectiveCameraProps,
    get as getPerspectiveCamera,
} from "./perspective-camera"
import Scene, {
    TProps as TSceneProps,
    name as SceneName,
    parse as parseSceneProps,
    get as getScene,
} from "./scene"
import Resource, {
    TResourceItem,
    name as ResourceName,
    parse as parseResourceProps,
    ResourceLoader,
} from './resource'

import WebGLRender from './webgl-render'

import { OrbitControls as _OrbitControls } from '~/three-addons/controls/OrbitControls'

import { loadGLTF } from './utils'
import * as THREE from "three"

type TElementName = typeof OrbitControlsName | typeof PerspectiveCameraName | typeof SceneName | typeof ResourceName


const MAP = [
    { type: OrbitControls, name: OrbitControlsName, parse: parseOrbitControlsProps, },
    { type: PerspectiveCamera, name: PerspectiveCameraName, parse: parsePerspectiveCameraProps, },
    { type: Scene, name: SceneName, parse: parseSceneProps },
    { type: Resource, name: ResourceName, parse: parseResourceProps },
]


export const getResouceFromChildren = (children: any): { [k in TElementName]?: any } => {
    if (Array.isArray(children)) {
        const maps = children.map(child => getResouceFromChildren(child))
        return maps.reduce((r, v) => ({ ...r, ...v }), {})
    } else if (React.isValidElement(children)) {
        const item = MAP.find(it => it.type === children.type)
        if (item) {
            const props = typeof item.parse === 'function' ? item.parse(children.props) : children.props
            return { [item.name]: props }
        }
    }
    return {}
}


export { OrbitControls, PerspectiveCamera, Scene, Resource, ResourceLoader }
export { default as Color } from './color'
export { default as Environment } from './environment'



export const ThreeRenderer = (props: {
    width?: number;
    height?: number;
    antialias?: boolean;
    children?: any;
}) => {
    const {
        width = 960,
        height = 540,
        antialias = false,
        children
    } = props

    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
    const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null)


    useEffect(() => {
        if (!canvas || !renderer) {
            return () => {
                renderer && renderer.dispose()
            }
        }

        let camera: THREE.Camera | null = null
        let scene: THREE.Scene | null = null
        let controls: _OrbitControls | null = null

        const mixers: THREE.AnimationMixer[] = []
        const resources = getResouceFromChildren(children)

        if (resources.scene) {
            scene = getScene(resources.scene, renderer)
        }
        if (!scene) {
            console.log('请放置一个场景<Scene>')
            return
        }

        if (resources["perspective-camera"]) {
            camera = getPerspectiveCamera({ ...resources["perspective-camera"], aspect: width / height });
            (camera as THREE.PerspectiveCamera).aspect = width / height;
            camera.position.set(0, 0, 30);
            camera.lookAt(0, 0, 0);
            (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
        }
        if (!camera) {
            console.log('请放置一个摄像机<Camera>')
            return
        }

        if (resources["orbit-controls"]) {
            controls = getOrbitControls(resources["orbit-controls"], camera, canvas)
        }
        const clock = new THREE.Clock();
        let h = 0
        const animate = () => {
            if (!scene || !renderer || !camera) {
                return
            }
            h = requestAnimationFrame(animate);
            const delta = clock.getDelta()
            mixers.forEach(mixer => mixer.update(delta))
            controls && controls.update()
            renderer.render(scene, camera);
        }
        controls && controls.update();
        animate()


        if (Array.isArray(resources.resource) && resources.resource.length > 0) {
            const list = resources.resource as TResourceItem[]
            Promise.all(list.map(({ uri }) => loadGLTF(uri))).then(gltfs => {
                gltfs.forEach((gltf, i) => {
                    const item = list[i]
                    const model = gltf.scene
                    model.position.set(...item.position)
                    model.scale.set(...item.scale)
                    scene?.add(model)
                    typeof item.onLoad === 'function' && item.onLoad(gltf)

                    if (gltf.animations.length > 0) {
                        const mixer = new THREE.AnimationMixer(model)
                        mixer.clipAction(gltf.animations[0]).play()
                        mixers.push(mixer)
                    }
                })
            })
        }

        return () => {
            cancelAnimationFrame(h)
            renderer && renderer.dispose()
        }
    }, [canvas, renderer])

    return <WebGLRender
        width={width}
        height={height}
        antialias={antialias}
        onMounted={({ canvas, renderer }) => {
            setCanvas(canvas)
            setRenderer(renderer)
        }}
    />
}