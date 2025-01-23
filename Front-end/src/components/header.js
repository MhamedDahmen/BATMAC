import React from "react";
import { NavLink } from "react-router-dom";

function Header () {
    return <>
    
<ul>
<NavLink to='/'>  
  <li>
    Home
  </li>
  </NavLink>
  <NavLink to='/showDomain'>  
  <li>
     Get Started
  </li>
  </NavLink>

  <li><a href="#about">About</a></li>
</ul>
    </>
}
export default Header ; 