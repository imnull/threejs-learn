import "./index.scss"
import * as THREE from 'three'
import ThreejsRender from "~/components/threejs-render"
import Archor from '~/components/archor'

export default () => {
    return <>
        <h1>Drawing lines</h1>
        <div className='content'>
            <Archor url='https://threejs.org/docs/index.html#manual/en/introduction/Drawing-lines' />
        </div>
        <ThreejsRender
            onMounted={
                ({ camera, renderer, scene }) => {
                    camera.position.set(0, 0, 100);
                    camera.lookAt(0, 0, 0);

                    const material = new THREE.LineBasicMaterial({ color: 0xffff00 });

                    const points = [];
                    points.push(new THREE.Vector3(-10, 0, 0));
                    points.push(new THREE.Vector3(0, 10, 0));
                    points.push(new THREE.Vector3(10, 0, 0));

                    const geometry = new THREE.BufferGeometry().setFromPoints(points);

                    const line = new THREE.Line(geometry, material);
                    scene.add(line)

                    renderer.render(scene, camera);
                }
            }
        />
    </>
}