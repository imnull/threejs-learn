import { useEffect, useState } from 'react'
import './index.scss'
import * as THREE from 'three'
import ThreejsCanvas from '~/components/threejs-canvas'

export default () => {
    return <>
        <h1>Code in NPM</h1>
        <div className='content'>
            <a href='https://www.npmjs.com/package/three' target='_blank'>https://www.npmjs.com/package/three</a>
        </div>
        <ThreejsCanvas width={960} height={540} onMounted={canvas => {

            const width = Number(canvas.width)
            const height = Number(canvas.height)

            const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
            camera.position.z = 1;
    
            const scene = new THREE.Scene();
    
            const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            const material = new THREE.MeshNormalMaterial();
    
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
    
            const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
            renderer.setSize(width, height);
    
            const animation = (time: number) => {
                mesh.rotation.x = time / 2000;
                mesh.rotation.y = time / 1000;
                renderer.render(scene, camera);
            }
    
            renderer.setAnimationLoop(animation);

            return () => {
                renderer.dispose()
            }
        }} />
    </>
}