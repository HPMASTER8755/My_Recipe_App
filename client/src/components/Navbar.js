import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const [cookies, setCookies]=useCookies(["access_token"]);
    const navigate=useNavigate();

    const logout=()=>{//have to done all this
        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }

  return (
    <div className='navbar'>
      <Link to={"/"}>Home</Link>
      
      {!cookies.access_token?(//not found token
      <Link to={"/auth"}>Register/Login</Link>):(
        <>
        <Link to={"/create-recipe"}>CreateRecipe</Link>
        <Link to={"/saved-recipes"}>SavedRecipes</Link>
        <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  )
}

export default Navbar
