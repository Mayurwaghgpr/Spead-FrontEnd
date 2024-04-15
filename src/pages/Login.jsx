import React ,{useState} from "react";
import googleicon from "../assets/search.png"
import Listration1 from "../assets/siginimage.png";
import { Link } from "react-router-dom";
import axios from "axios";
function Login(){
    const [LogIn,setLoginInfo]= useState({
        username:'',
        password:''
    });    
    function handelLogin(e){
        const {name,value}= e.target;
        setLoginInfo(prv=>({
            ...prv,
            [name]:value,
        }));
    } 
    function LoginUser() {
        axios.post('http://localhost:4000/Login', LogIn)
            .then(function (response) {
                console.log(response.status)
                alert(response.data);
            })
            .catch(function (error) {
                console.log(error);
                alert(error);
            });
        }
    return(
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100" tabIndex="-1">
        <p className="w-100 p-3"><Link to="/" className="text-start text-black fs-1 text-shadow text-decoration-none"><i className="bi bi-house"></i></Link></p>
        <h1 className="fs-3 mb-3">Welcome to Blogger</h1>
        <div className="row rounded-1 p-3 bg-white shadow box-size box-area">
            <div className="col-md-6 col-lg-5 rounded-3 d-flex justify-content-center align-items-center flex-column left-box" style={{ backgroundColor: "#f3ebe9" }}>
                <div className="Signup-image mb-3">
                    <img className="img-fluid mx-auto d-block" src={Listration1} alt={"Login illustration"} />
                </div>
                <div className="text-center">
                    <p className="mb-1">Lets Explore</p>
                    <small className="text-wrap">Join community, share your thoughts, read Blogs and many more...</small>
                </div>
            </div>
            <div className="col-md-6 col-lg-7 right-box">
                <div className="row align-items-center">
                    <div className="header-text mb-4"></div>
                    <div className="mb-3">
                        <input type="Email" onChange={handelLogin} name="username" className="form-control form-control-lg bg-light fs-6" placeholder="Email" value={LogIn.username}/>
                    </div>
                    <div className="mb-3 d-flex flex-column">
                        <input type="password" onChange={handelLogin} name="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" value={LogIn.password} />
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="rememberCheck" />
                            <label htmlFor="rememberCheck" className="form-check-label">Remember me</label>
                        </div>
                        <div className="forgot-pass">
                            <small><Link to="">Forgot Password?</Link></small>
                        </div>
                    </div>
                    <div className="input-group mb-3">
                        <button onClick={LoginUser} className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">or</div>
                    <div className="input-group mb-3">
                        <button className="btn btn-lg btn-light d-flex gap-3 justify-content-center w-100 fs-6"><img height="24px" src={googleicon} alt="" /><small>Continue with Google</small></button>
                    </div>
                    <div className="row">
                        <small>Don't have an Account? <Link to="/SignUP">Sign Up</Link></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    )
}
export default Login;