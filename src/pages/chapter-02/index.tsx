import "./index.scss"
import { useEffect, useState } from 'react'
import './index.scss'
import * as THREE from 'three'
import ThreejsCanvas from '~/components/threejs-canvas'
import Archor from '~/components/archor'

export default () => {
    return <>
        <h1>WebGL compatibility check</h1>
        <div className='content'>
            <Archor url='https://threejs.org/docs/index.html#manual/en/introduction/WebGL-compatibility-check' />
        </div>
    </>
}