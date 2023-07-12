import * as THREE from 'three'
import { RoomEnvironment } from '~/three-addons/environments/RoomEnvironment';

export type TProps = {
    sigma?: number;
    near?: number;
    far?: number;
}

export const name = 'environment'

export const get = (props: TProps, renderer: THREE.WebGLRenderer) => {
    const {
        sigma = 0,
        near = 0.1,
        far = 100,
    } = props
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), sigma, near, far).texture
    return environment
}

export const parse = (props: TProps) => {
    return { ...props }
}

export default (props: TProps) => null