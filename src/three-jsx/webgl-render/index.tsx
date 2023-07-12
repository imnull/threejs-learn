import { useEffect, useState } from "react"
import * as THREE from "three";

export default (props: {
    width?: number;
    height?: number;
    antialias?: boolean;
    onMounted?: (params: {
        canvas: HTMLCanvasElement;
        renderer: THREE.WebGLRenderer;
        width: number;
        height: number;
    }) => void
}) => {
    const { antialias = false, width = 1280, height = 720, onMounted } = props
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (canvas && typeof onMounted === 'function') {
            const width = Number(canvas.width)
            const height = Number(canvas.height)

            const renderer = new THREE.WebGLRenderer({ canvas, antialias });
            renderer.setSize(width, height);
            return onMounted({ canvas, renderer, width, height })
        }
    }, [canvas])

    return <canvas width={width} height={height} ref={setCanvas}></canvas>
}