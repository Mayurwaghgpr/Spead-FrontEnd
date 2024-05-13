import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Viewblogs from './component/viewblogs';
import Home from './pages/Home';
import CreatBlog from './component/CreateBlog';
import Pagerror from './pages/Pagerror';
import Navbar from './component/navbar';
import Profile from './pages/userProfile/Profile';
import Privcard from './component/Privcard';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navbar />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/createblog',
          element: <CreatBlog />,
        },
        {
          path: '/my-profile',
          element: <Profile />
        }
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
          element: <Privcard />
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
