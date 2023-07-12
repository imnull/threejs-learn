import Home from '~/pages/home';
import Chapter00 from '~/pages/chapter-00';
import Chapter01 from '~/pages/chapter-01';
import Chapter02 from '~/pages/chapter-02';
import Chapter03 from '~/pages/chapter-03';
import Chapter04 from '~/pages/chapter-04';
import Chapter05 from '~/pages/chapter-05'

export default [
    { path: '/', text: 'Home', element: <Home /> },
    { path: 'chapter-00', text: 'Chapter00', element: <Chapter00 /> },
    { path: 'chapter-01', text: 'Chapter01', element: <Chapter01 /> },
    { path: 'chapter-02', text: 'Chapter02', element: <Chapter02 /> },
    { path: 'chapter-03', text: 'Chapter03', element: <Chapter03 /> },
    { path: 'chapter-04', text: 'Chapter04', element: <Chapter04 /> },
    { path: 'chapter-05', text: 'Chapter05', element: <Chapter05 /> }
];