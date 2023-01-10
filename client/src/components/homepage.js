import React from "react"
import "../styles/home.css"
import homeImage from "../assets/homepage.png"
import { Container, Row, Col, Image, Button } from "react-bootstrap"

export default function HomePage(props) {

    if(props.isLoggedIn) {
        return (
            <>
                <div className="custom_title">
                        Your One-Stop Solution <br /> for <span className="collaboration">Managing</span> and <span className="projectManagement"><br />Organizing</span> Your Tasks
                    </div>
                    <span className="subtext">Tasker allows you to effortlessly manage your tasks <br /> and stay organized. Now you can prioritize your work,<br /> stay focused, and get things done efficiently.</span>
                    <img src={homeImage} height="700px" className="frontPageImage" alt="front page" align="right"/>
                    <Button variant="light" href="/tasks" className="customhome_button"><h3 className="button_text">Tasks</h3></Button>
                </>
        )
    } else {
        return (
            <>
                <div className="custom_title">
                        Your One-Stop Solution <br /> for <span className="collaboration">Managing</span> and <span className="projectManagement"><br />Organizing</span> Your Tasks
                    </div>
                    <span className="subtext">Tasker allows you to effortlessly manage your tasks <br /> and stay organized. Now you can prioritize your work,<br /> stay focused, and get things done efficiently.</span>
                    <img src={homeImage} height="700px" className="frontPageImage" alt="front page" align="right"/>
                    <Button variant="light" href="/signup" className="customhome_button"><h3 className="button_text">Get Started</h3></Button>
            </>
        )
    }

    //Breakpoint at 1480px
    // The text goes on top, with the button under the text, adn then image under.
    // Then the smaller it gets the text just stretches lower, and the pix adjusts, make black space around the image and when its the smallest screen size, it fits the whole page.
}