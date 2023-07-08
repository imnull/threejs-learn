import { useEffect, useState } from "react"

export default (props: {
    width?: number;
    height?: number;
    onMounted?: (canvas: HTMLCanvasElement) => (() => void)
}) => {
    const { width = 1280, height = 720, onMounted } = props
    const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if(canvas && typeof onMounted === 'function') {
            return onMounted(canvas)
        }
    }, [canvas])

    return <canvas width={width} height={height} ref={setCanvas}></canvas>
}