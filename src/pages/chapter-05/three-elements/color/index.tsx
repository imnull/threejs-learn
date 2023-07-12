import * as THREE from 'three'

export type TProps = {
    color?: number;
}

export const name = 'color'

export const get = (props: TProps) => {
    const { color = 0 } = parse(props)
    const c = new THREE.Color(color)
    return c
}

export const parse = (props: any) => {
    const { color = 0 } = props
    return { color }
}

export default (props: TProps) => null