import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import  { FiShoppingCart } from "react-icons/fi"
import  { CgMenu, CgClose } from "react-icons/cg"
import { Badge } from '@mui/material';
const Nav = () => {
    const Navui = styled.nav`
    display:flex;
    gap: 4.8rem;
    align-items:center;
    
    .navbar-link{
        &:link,
        &:visited{
            display:inline-block;
            text-decoration:none;
            font-size:1.8rem;
            font-weight:500;
            text-transform: uppercase;
            color: black;
            transition: color 0.3s linear;  
        }
        &:hover,
        &:active{
            color: #8490ff;
        } 
    }
    .mobile-navbar-btn{
        display:none;
        background-color: transparent;
        cursor: pointer;
        border:none;
    }
    .mobile-nav-icon[name="close-outline"]{
        display:none;
    }
    .close-outline{
        display: none;
    }
    .cart-trolley--link{
        position: relative;
    }
    .cart-trolley{
        position: relative;
        font-size:3.2rem ;
    }
    .cart-total--item{
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color:#000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left:70%;
        background-color: #8490ff  ;
    }
    .user-login--name {
      text-transform: capitalize;
    }
    .user-logout,
    .user-login{
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    } 
    @media(max-widht:768px){
      .mobile-navbar-btn{
        display: inline-block;
        z-index: 9999;
        border: black;

        .mobile-nav-icon{
          font-size: 4.2rem;
          color:black;
        }
      }
      .active .mobile-nav-icon {
        display:none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color:black;
        z-index:9999;
      }
      .active .close-outline {
        display:inline-block;
      }

    }
`;
    return(
        <Navui>
        <li>
        <NavLink to="/" className="navbar-link">
          inicio
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="navbar-link">
          sobre nosotros
        </NavLink>
      </li>
      <li>
        <NavLink to="/" className="navbar-link cart-trolley--link">
            <Badge badgeContent={2} color="secondary">
                 <FiShoppingCart />
            </Badge>
        </NavLink>
      </li>
      <div className="mobile-navbar-btn">
         <CgMenu name="menu-outline" className="mobile-nav-icon" />   
         <CgClose name="menu-outline" className="mobile-nav-icon close-outline" />  
      </div>
      </Navui>

    )
}
export default Nav;