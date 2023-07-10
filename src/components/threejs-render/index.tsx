import ThreejsCanvas from '~/components/threejs-canvas'
import * as THREE from 'three'

export default (props: {
    onMounted: (params: {
        width: number;
        height: number;
        renderer: THREE.WebGLRenderer;
        camera: THREE.PerspectiveCamera;
        scene: THREE.Scene;
        canvas: HTMLCanvasElement;
    }) => void
    cameraNear?: number;
    cameraFar?: number;
    cameraFov?: number;
    width?: number;
    height?: number;
}) => {
    const { onMounted, cameraNear = 1, cameraFar = 500, cameraFov = 45, width = 960, height = 540, } = props
    return <ThreejsCanvas width={width} height={height} onMounted={
        canvas => {

            const width = Number(canvas.width)
            const height = Number(canvas.height)

            const renderer = new THREE.WebGLRenderer({ canvas });
            renderer.setSize(width, height);

            const camera = new THREE.PerspectiveCamera(cameraFov, width / height, cameraNear, cameraFar);
            const scene = new THREE.Scene();

            let dispose: any = null

            typeof onMounted === 'function' && (dispose = onMounted({
                width, height,
                renderer,
                camera,
                scene,
                canvas,
            }))

            return () => {
                if(typeof dispose === 'function') {
                    dispose()
                }
                renderer.dispose()
            }
        }}
    />
}