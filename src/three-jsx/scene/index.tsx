import React from 'react';
import * as THREE from 'three'
import Color, { parse as parseColorProps, get as getColor } from '../color'
import Environment, { TProps as TEnvProps, parse as parseEnvironmentProps, get as getEnvironment } from '../environment'

export type TProps = {
    background?: number;
    children?: any;
}

export const name = 'scene'

const parseSceneChildren = (children: any): {
    background?: number;
    environment?: TEnvProps;
} => {
    if (Array.isArray(children)) {
        return children.map(child => parseSceneChildren(child)).reduce((r, v) => ({ ...r, ...v }), {})
    } else if (React.isValidElement(children)) {
        if (children.type === Color) {
            const { color = 0 } = parseColorProps(children.props as any)
            return { background: color }
        } else if(children.type === Environment) {
            return { environment: parseEnvironmentProps(children.props as any) }
        }
    }
    return {}
}

export const parse = (props: any) => {
    const { children } = props
    return parseSceneChildren(children)
}

export const get = (props: any, renderer: THREE.WebGLRenderer) => {
    const { background = 0, environment } = props
    const scene = new THREE.Scene()
    scene.background = getColor({ color: background })
    if(environment) {
        scene.environment = getEnvironment(environment, renderer)
    }
    return scene
}

export default (props: TProps) => null


