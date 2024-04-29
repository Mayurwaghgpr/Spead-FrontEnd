import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Viewblogs from './component/viewblogs';
import Home from './pages/Home';
import CreatBlog from './component/CreateBlog';
import Blog from './component/Blog';
import Pagerror from './pages/Pagerror';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/createblog',
          element: <CreatBlog />,
        },
      ],
      errorElement: <Pagerror />
    },
    {
      path: '/SignUp',
      element: <SignUp />,
    },
    {
      path: '/Login',
      element: <Login />,
    },
    {
      path: '/Blogs',
      element: <Viewblogs />,
      children: [
        {
          path: "/Blogs",
          element: <Blog />
        }
      ]
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
