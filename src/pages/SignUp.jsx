import React, { useState } from "react";
import illestration from"../assets/siginimage.png"
import googleicon from "../assets/search.png"
import { Link } from "react-router-dom";
import axios from 'axios';
function SignIn(){
    const [confirmPassword, setConfirmPassword] = useState('');

    const [SignUp,setSignUPInfo]= useState({
        username:'',
        password:''
    });
    function handleConfirmPassword(e) {
        const { value } = e.target;
        if (value.trim() !== '') {
            setConfirmPassword(value);
        } else {
            setConfirmPassword('');
        }
    }
    
    
    function handelSignup(e){
        const {name,value}= e.target;
        setSignUPInfo(prv=>({
            ...prv,
            [name]:value,
        }));
    } 
    function Register() {
        if (SignUp.password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }else{
        axios.post('http://localhost:4000/Register', SignUp)
            .then(function (response) {
                alert(response.data.message);
            })
            .catch(function (error) {
                console.log(error.response.data);
                alert(error.response.data.error);
            });
        }
    }
    
    return( 
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100" tabIndex="-1">
        <p className="w-100 "><Link to="/" className="text-start text-black fs-1 text-shadow text-decoration-none"><i className="bi bi-house"></i></Link></p>
        <h1 className="fs-3 mb-3">Welcome to Blogger</h1>
        <div className="row rounded-1 p-3 bg-white shadow box-size box-area">
            <div className="col-md-6 col-lg-5 rounded-3 d-flex justify-content-center align-items-center flex-column left-box" style={{ backgroundColor: "#f3ebe9" }}>
                <div className="Signup-image mb-3">
                    <img className="img-fluid mx-auto d-block" src={illestration} alt={"Signup illustration"} />
                </div>
                <div className="text-center">
                    <p className="mb-1">Let's Explore</p>
                    <small className="text-wrap">Join community, share your thoughts, read Blogs and many more...</small>
                </div>
            </div>
            <div className="col-md-6 col-lg-7 right-box">
                <div className="row align-items-center">
                    <div className="mb-3">
                        <input type="Email" onChange={handelSignup} name="username" className="form-control form-control-lg bg-light fs-6" placeholder="Email" value={SignUp.username}/>
                    </div>
                    <div className="mb-3 d-flex flex-column">
                        <input type="password" onChange={handelSignup} name="password" className="form-control form-control-lg bg-light fs-6" placeholder="Password" value={SignUp.password} />
                        <input type="password" onChange={handleConfirmPassword} name="confirmPassword" className="form-control form-control-lg bg-light fs-6" placeholder="Confirm Password" value={confirmPassword} />
                        <small className="h-100 text-danger">{confirmPassword !== '' && SignUp.password !== confirmPassword && 'Passwords do not match'}</small>
                    </div>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" name="Password" />
                            <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Remember me</small></label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button onClick={Register} className="btn btn-lg btn-primary w-100 fs-6">Sign Up</button>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-3">or</div>
                    <div className="mb-3">
                    <button className="btn btn-lg btn-light d-flex gap-3 justify-content-center w-100 fs-6"><img height="24px" src={googleicon} alt="" /><small>Continue with Google</small></button>
                    </div>
                    <div className="row">
                        <small>Already have an Account? <Link to="/Login">Login</Link></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    

        )
       
}
export default SignIn;