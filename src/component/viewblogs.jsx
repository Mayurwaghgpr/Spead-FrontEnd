import React, { useState, useEffect } from "react";
import "./viewblogs.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import Login from "../pages/Login";

function Viewblogs() {
      const [login,setlogin]=useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    console.log("set", category);
    fetch(`http://localhost:3000/posts?type=${category}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setData([
          {
            id: 0,
            title: "server down",
            image: "https://ginbits.com/wp-content/uploads/2021/08/How-to-Fix-500-Internal-Server-Error.png",
          },
        ]);
        console.log("oops");
      });
  }, [category]);

  return (
    <>
      <div className=" h-lvh text-black">
        <div className="flex justify-between"><h1>{"{...Spread}"}</h1> <button onClick={()=>{setlogin(true);setsingup(false)}} className="text-decoration-none login p-2 rounded-border-1px">Login</button></div>
        <div className=" pl-5">
           <Link to="/" className="d-flex text-decoration-none mt-1">
          <i className="bi bi-house fs-4 text-black"></i>
          <span className="fs-4 d-none d-sm-inline text-black">Home</span>
          </Link>
          <ul>
            <li>
              <NavLink to="/Blogs" className="t-btn" onClick={()=> setCategory("All")}>ALL</NavLink>
            </li>
             <li>
               <NavLink to="/Blogs" className="t-btn" onClick={()=> setCategory("Sci")}
                  >
                  <span className="">Science</span>
                </NavLink>
            </li>
            <li>
              <NavLink to="/Blogs" className="t-btn" onClick={()=> setCategory("It")}>
                <span className="">IT</span>
            </NavLink>
            </li>
            <li>
              <NavLink to="/Blogs" className="t-btn" onClick={()=> setCategory("Space")}
                  >
                  <span className="">Space</span>
                </NavLink>
            </li>
           
          </ul>
        </div>
        <div>
        {/* <Outlet context={data} /> */}
        {login?<Login onclose={()=>setlogin(false)}/>:null}
        </div>
      </div>
    </>
  );
}

export default Viewblogs;
