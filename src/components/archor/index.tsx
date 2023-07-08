export default (props: { url: string; text?: string; target?: string }) => {
    const { url, text = url, target = '_blank' } = props
    return <a href={url} target={target}>{text}</a>
}