import { useEffect, useState } from 'react'
import './index.scss'
import * as THREE from 'three'
import ThreejsCanvas from '~/components/threejs-canvas'
import Archor from '~/components/archor'

export default () => {
    return <>
        <h1>Creating a scene</h1>
        <div className='content'>
            <Archor url='https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene' />
        </div>
        <ThreejsCanvas width={960} height={540} onMounted={canvas => {

            const width = Number(canvas.width)
            const height = Number(canvas.height)

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

            const renderer = new THREE.WebGLRenderer({ canvas });
            renderer.setSize(width, height);

            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            camera.position.z = 5;

            let handle: number = 0

            function animate() {
                handle = requestAnimationFrame(animate);

                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;

                renderer.render(scene, camera);
            }

            animate();

            return () => {
                renderer.dispose()
                cancelAnimationFrame(handle)
            }
        }} />
    </>
}