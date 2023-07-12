import { GLTFLoader, GLTF } from '~/three-addons/loaders/GLTFLoader'
import { DRACOLoader } from '~/three-addons/loaders/DRACOLoader'


const DRACO_LOADER = new DRACOLoader()
DRACO_LOADER.setDecoderConfig({ type: 'js' })
DRACO_LOADER.setDecoderPath('assets/threejs/')

export const loadGLTF = (url: string) => new Promise<GLTF>((resolve, reject) => {
    const loader = new GLTFLoader()
    loader.setDRACOLoader(DRACO_LOADER)
    loader.load(url, (gltf) => {
        resolve(gltf)
    }, (evt) => {
        // console.log(evt)
    }, err => {
        reject(err)
    })
})