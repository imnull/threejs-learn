import "./index.scss"
import * as THREE from 'three'
import ThreejsRender from "~/components/threejs-render"
import Archor from '~/components/archor'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

const MODEL_URL = 'https://github.khronos.org/glTF-Sample-Viewer-Release/assets/models/2.0/DamagedHelmet/glTF/DamagedHelmet.gltf'
// const MODEL_URL = 'http://127.0.0.1/git/gltf/01/m.gltf'

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
                    draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

                    const controls = new OrbitControls(camera, canvas)
                    controls.target.set(0, 0, 0);
                    controls.update();
                    controls.enablePan = false;
                    controls.enableDamping = true;

                    const loader = new GLTFLoader()
                    loader.setDRACOLoader(draco)
                    loader.load(MODEL_URL, (gltf) => {
                        const model = gltf.scene;
                        console.log(111111, model)
                        model.position.set(0, 0, 0);
                        model.scale.set(10, 10, 10)
                        scene.add(model);
                        animate();
                    })

                    scene.background = new THREE.Color(0xbfe3dd);
                    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

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