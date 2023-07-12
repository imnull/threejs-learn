import React from "react"
import { GLTF } from '~/three-addons/loaders/GLTFLoader'

export type TResourceType = 'gltf'
export type TResourceItem = {
    type: TResourceType;
    uri: string;
    position: [number, number, number];
    scale: [number, number, number];
    onLoad?: (gltf: GLTF) => void;
}

export const ResourceLoader = (props: {
    type?: TResourceType;
    uri: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    onLoad?: (gltf: GLTF) => void;
}): JSX.Element | null => {
    return null
}

export const name = 'resource'

const getResourceList = (children: any): TResourceItem[] => {
    if (Array.isArray(children)) {
        return children.map(getResourceList).flat(1)
    } else if (React.isValidElement(children)) {
        if (children.type === ResourceLoader) {
            const {
                type = 'gltf',
                uri = '',
                position: [x = 0, y = 0, z = 0] = [],
                scale: [l = 1, m = 1, n = 1] = [],
                onLoad,
            } = children.props as any
            return [{
                type, uri,
                position: [x, y, z],
                scale: [l, m, n],
                onLoad,
            }]
        }
    }
    return []
}

export const parse = (props: any) => {
    const { children } = props
    return getResourceList(children)
}

export default (props: {
    children?: any
}) => {
    return null
}