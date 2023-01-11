import React from "react"
import "../styles/home.css"
import homeImage from "../assets/homepage.png"
import { Button } from "react-bootstrap"

export default function HomePage(props) {

    if(props.isLoggedIn) {
        return (
            <div className="trial_container">
                <div className="container_1">
                    <h1>Your One-Stop Solution for <span className="managing">Managing</span> and <span className="organizing">Organizing</span> Your Tasks</h1>
                    <h3>Tasker allows you to effortlessly manage your tasks and stay organized. Now you can prioritize your work, stay focused, and get things done efficiently.</h3>
                    <Button variant="light" href="/tasks" className="homepage_button"><h3>Tasks</h3></Button>
                </div>
                <div className="container_2"><img src={homeImage} className="custom_homepageimage" alt="Home"/></div>
            </div>
        )
    } else {
        return (
            <div className="trial_container">
                <div className="container_1">
                    <h1>Your One-Stop Solution for <span className="managing">Managing</span> and <span className="organizing">Organizing</span> Your Tasks</h1>
                    <h3>Tasker allows you to effortlessly manage your tasks and stay organized. Now you can prioritize your work, stay focused, and get things done efficiently.</h3>
                    <Button variant="light" href="/signup" className="homepage_button"><h3>Get Started</h3></Button>
                </div>
                <div className="container_2"><img src={homeImage} className="custom_homepageimage" alt="Home"/></div>
            </div>
        )
    }
}