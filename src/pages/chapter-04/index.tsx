import "./index.scss"
import * as THREE from 'three'
import ThreejsRender from "~/components/threejs-render"
import Archor from '~/components/archor'

import { GLTFLoader } from '~/three-addons/loaders/GLTFLoader'
import { DRACOLoader } from '~/three-addons/loaders/DRACOLoader'
import { OrbitControls } from '~/three-addons/controls/OrbitControls'
import { RoomEnvironment } from '~/three-addons/environments/RoomEnvironment'

const MODEL_URL = '/assets/models/DamagedHelmet.gltf'
// const MODEL_URL = 'http://127.0.0.1/git/gltf/01/m.glb'
// const MODEL_URL = 'https://api.vntana.com//assets/products/7eed7d1b-bd3e-4786-ba36-a7bf0b263143/organizations/kohler/clients/150th-anniversary/c1e42caf-93b5-47c3-860a-70f90230b238.glb'

export default () => {
    return <>
        <h1>Loading 3D models</h1>
        <div className='content'>
            <Archor url='https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models' />
        </div>
        <ThreejsRender
            onMounted={
                ({ camera, renderer, scene, canvas }) => {

                    camera.position.set(0, 0, 30);
                    camera.lookAt(0, 0, 0);

                    const clock = new THREE.Clock();
                    const pmremGenerator = new THREE.PMREMGenerator(renderer);

                    const draco = new DRACOLoader()
                    draco.setDecoderConfig({ type: 'js' });
                    draco.setDecoderPath('/assets/threejs/');

                    const controls = new OrbitControls(camera, canvas)
                    controls.target.set(0, 0, 0);
                    controls.update();
                    controls.enablePan = false;
                    controls.enableDamping = true;

                    scene.background = new THREE.Color(0xbfe3dd);
                    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

                    const loader = new GLTFLoader()
                    loader.setDRACOLoader(draco)
                    loader.load(MODEL_URL, (gltf) => {
                        const model = gltf.scene;
                        model.position.set(0, 0, 0);
                        model.scale.set(10, 10, 10)
                        scene.add(model);
                        animate();
                    })


                    let h = 0
                    function animate() {
                        h = requestAnimationFrame(animate);
                        const delta = clock.getDelta();
                        controls.update();
                        renderer.render(scene, camera);
                    }

                    return () => {
                        console.log('cancelRequestAnimationFrame', h)
                        cancelAnimationFrame(h)
                    }
                }
            }
        />
    </>
}