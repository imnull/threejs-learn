import Home from '~/pages/home';
import Chapter00 from '~/pages/chapter-00';
import Chapter01 from '~/pages/chapter-01';
import Chapter02 from '~/pages/chapter-02'

export default [
    { path: '/', text: 'Home', element: <Home /> },
    { path: 'chapter-00', text: 'Chapter00', element: <Chapter00 /> },
    { path: 'chapter-01', text: 'Chapter01', element: <Chapter01 /> },
    { path: 'chapter-02', text: 'Chapter02', element: <Chapter02 /> }
];