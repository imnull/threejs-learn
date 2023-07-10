const fs = require('fs')
const path = require('path')

const page2name = (page) => {
    return page.charAt(0).toUpperCase() + page.substring(1).replace(/\-./g, m => m.charAt(1).toUpperCase())
}

const makeRoutes = () => {
    const pagePath = path.resolve(__dirname, '../src/pages')
    if (!fs.existsSync(pagePath) || !fs.statSync(pagePath).isDirectory()) {
        return ''
    }
    const pages = fs
        .readdirSync(pagePath)
        .filter(name => fs.existsSync(path.resolve(__dirname, `../src/pages/${name}/index.tsx`)))
        .sort((a, b) => {
            if (a === 'home') {
                return -1
            } else if (b === 'home') {
                return 1
            } else {
                const _a = Number(a.split('-').pop())
                const _b = Number(b.split('-').pop())
                return _a - _b
            }
        })
    const imports = pages.map(page => {
        return `import ${page2name(page)} from '~/pages/${page}'`
    })
    const items = pages.map(page => {
        const comeName = page2name(page)
        return `{ path: '${page === 'home' ? '/' : page}', text: '${comeName}', element: <${comeName} /> }`
    })

    const _code = imports.join(';\n') + '\n\n'
        + 'export default [\n'
        + items.map(l => `    ${l}`).join(',\n')
        + '\n];'

    return _code
}

const ROUTE_FILE = path.resolve(__dirname, '../src/routes.tsx')


/**
 * 
 * @param {number} chapter 
 */
const createPage = (chapter) => {
    const basePath = path.resolve(__dirname, '../src/pages')
    const page = `chapter-${chapter.toString().padStart(2, '0')}`
    const dir = path.join(basePath, page)
    const tsx = path.join(dir, 'index.tsx')
    const scss = path.join(dir, 'index.scss')
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory() && fs.existsSync(tsx) && fs.statSync(tsx).isFile()) {
        return
    }
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    fs.writeFileSync(tsx, [
        'import "./index.scss"',
        'export default () => {',
        '    return <>',
        '        <h1>' + page2name(page) + '</h1>',
        '    </>',
        '}'
    ].join('\n'))

    fs.writeFileSync(scss, '')

    const routeCode = makeRoutes()
    fs.writeFileSync(ROUTE_FILE, routeCode)
}

const [, , command, n] = process.argv

if (command === 'make') {
    const routeCode = makeRoutes()
    fs.writeFileSync(ROUTE_FILE, routeCode)
    console.log('路由文件生成完成')
} else if (command === 'page') {
    const chapter = Number(n)
    if (!isNaN(chapter) && chapter > 0) {
        createPage(chapter)
        console.log('页面创建完成，路由已更新')
    }
}