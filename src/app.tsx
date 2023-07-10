import { Routes, Route, NavLink, HashRouter as Router } from 'react-router-dom'
import './app.scss'

import routes from './routes'

export default () => {
    return <div className='marvin-movable'>
        <Router>
            <div className='menu'>
                {routes.map(({ path, text }, i) => <NavLink className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`} to={path} key={i}>{text}</NavLink>)}
            </div>
            <div className='content'>
                <Routes>
                    {routes.map(({ path, element }, i) => <Route path={path} element={element} key={i} />)}
                </Routes>
            </div>
        </Router>
    </div>
}