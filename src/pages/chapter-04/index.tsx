import "./index.scss"
import * as THREE from 'three'
import ThreejsRender from "~/components/threejs-render"
import Archor from '~/components/archor'

import { GLTFLoader } from '~/three-addons/loaders/GLTFLoader'
import { DRACOLoader } from '~/three-addons/loaders/DRACOLoader'
import { OrbitControls } from '~/three-addons/controls/OrbitControls'
import { RoomEnvironment } from '~/three-addons/environments/RoomEnvironment'

const MODEL_URL = '/assets/my-models/football.gltf'

export default () => {
    return <>
        <h1>Loading 3D models</h1>
        <div className='content'>
            <Archor url='https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models' />
        </div>
        <ThreejsRender
            cameraFar={10000}
            onMounted={
                ({ camera, renderer, scene, canvas }) => {

                    camera.position.set(0, 50, 260);
                    camera.lookAt(0, 0, 0);


                    const draco = new DRACOLoader()
                    draco.setDecoderConfig({ type: 'js' });
                    draco.setDecoderPath('/assets/threejs/');

                    const controls = new OrbitControls(camera, canvas)
                    controls.target.set(0, 0, 0);
                    controls.update();
                    controls.enablePan = false;
                    controls.enableDamping = true;

                    scene.background = new THREE.Color(0xbfe3dd);
                    const pmremGenerator = new THREE.PMREMGenerator(renderer);
                    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

                    // const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 0.8 );
                    // hemiLight.position.set( 0, 220, 0 );
                    // scene.add( hemiLight );

                    // const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
                    // dirLight.position.set( 0, 120, 0 );
                    // scene.add( dirLight );

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