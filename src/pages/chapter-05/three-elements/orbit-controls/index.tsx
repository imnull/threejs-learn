import * as THREE from 'three'
import { OrbitControls } from '~/three-addons/controls/OrbitControls'

export type TProps = {
    target?: [number?, number?, number?];
    enablePan?: boolean;
    enableDamping?: boolean;
}

export const name = 'orbit-controls'

export const parse = (props: any) => {
    const {
        target: [x = 0, y = 0, z = 0] = [],
        enablePan = false,
        enableDamping = false,
    } = props
    return {
        target: [x, y, z],
        enablePan,
        enableDamping
    }
}

export const get = (props: TProps, camera: THREE.Camera, canvas: HTMLCanvasElement) => {
    const {
        target: [x = 0, y = 0, z = 0] = [],
        enablePan = false,
        enableDamping = false,
    } = props
    const controls = new OrbitControls(camera, canvas)
    controls.target.set(x, y, z);
    controls.enablePan = enablePan;
    controls.enableDamping = enableDamping;
    return controls
}

export default (props: TProps) => null