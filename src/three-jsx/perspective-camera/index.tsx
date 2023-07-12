import React from 'react';
import * as THREE from 'three'
import Color, { parse as parseColorProps } from '../color';
import Environment, { parse as parseEnvironmentProps } from '../environment';

export type TPropsBase = {
    fov: number;
    aspect: number;
    near: number;
    far: number;
    position?: [number, number, number];
}

export type TProps = { [key in keyof TPropsBase]?: TPropsBase[key]; }

export const name = 'perspective-camera'

const getChildrenProps = (children: any): { color?: number; environment?: ReturnType<typeof parseEnvironmentProps> } => {
    if(Array.isArray(children)) {
        return children.map(getChildrenProps).reduce((r, v) => ({ ...r, ...v }), {})
    } else if(React.isValidElement(children)) {
        if(children.type === Color) {
            return parseColorProps(children.props as any)
        } else if(children.type === Environment) {
            return { environment: parseEnvironmentProps(children.props as any) }
        }
    }
    return {}
}

export const parse = (props: any) => {
    return { ...props }
}

export const get = (props: any) => {
    const {
        fov = 75,
        aspect = 1,
        near = 0.1,
        far = 2000,
        position = [0, 0, 0],
    } = props
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    camera.position.set(...(position as [number, number, number]))
    return camera
}

export default (props: TProps) => null