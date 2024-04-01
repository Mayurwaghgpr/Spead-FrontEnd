import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './component/Signin';
import Login from './component/Login';
import Home from './component/Home';
import Viewblogs from './component/viewblogs';
function App() {
  return (
    <>
      <Routes>
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/' element={<Home/>}/>
        <Route path='/Blogs' element={<Viewblogs/>}/>
      </Routes>
    </>
  );
}

export default App;
