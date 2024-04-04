import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './component/Signin';
import Login from './component/Login';
import Viewblogs from './component/viewblogs';
import Home from './component/Home';
import CreatBlog from './component/CreateBlog';
import Blog from './component/Blog';
import Pagerror from './component/Pagerror';

function App() {
  const router= createBrowserRouter([
    {
      path:'/',
      element:<Home/>,
      errorElement:<Pagerror/>
    },
    {
      path:'/SignIn',
      element:<SignIn />,
    },
    {
      path:'/Login',
      element:<Login />,
    },
    {
      path:'/Blogs',
      element:<Viewblogs/>,
      children:[
        {
          path:'/Blogs/createblog',
          element:<CreatBlog/>,
      },
      {
        path:"/Blogs",
        element:<Blog/>
      }
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
