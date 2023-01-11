import React from "react"
import NavbarComp from "../components/homenavbar"
import "../styles/home.css"
import HomePage from "../components/homepage"
export default function Home(props) {
    
    const user = props.user

    const isLoggedIn = () => {
        if(user === null) {
            return false;
        } else {
            return true;
        }
    }

    return(
        <div className="main_color">
            <NavbarComp isLoggedIn={isLoggedIn()}/>
            <HomePage isLoggedIn={isLoggedIn()}/>
        </div>
    )
}