import { Routes, Route, NavLink, HashRouter as Router } from 'react-router-dom'

import Home from '~/pages/home'
import Chapter01 from '~/pages/chapter-01'

import './app.scss'

const config = [
    { path: '/', text: 'Home', element: <Home /> },
    { path: '/chapter-01', text: 'Chapter 01', element: <Chapter01 /> },
]

export default () => {
    return <div className='marvin-movable'>
        <Router>
            <div className='menu'>
                {config.map(({ path, text }, i) => <NavLink className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} to={path} key={i}>{text}</NavLink>)}
            </div>
            <div className='content'>
                <Routes>
                    {config.map(({ path, element }, i) => <Route path={path} element={element} key={i} />)}
                </Routes>
            </div>
        </Router>
    </div>
}