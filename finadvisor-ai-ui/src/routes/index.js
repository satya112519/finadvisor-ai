import { useRoutes } from 'react-router-dom';

// project import
import Join from "../components/Join/Join";
import Chat from "../components/Chat/Chat";


export default function ThemeRoutes() {
    return useRoutes([
        {
            path: '/',
            element: <Join />
        },
        {
            path: 'chat',
            element: <Chat />
        }
    ]);
}