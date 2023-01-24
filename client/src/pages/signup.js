import React, { useState } from "react";
import "../styles/authentication.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useAuthContext } from "../hooks/useAuthContext";
import Alert from 'react-bootstrap/Alert';

export default function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    
    const handleSubmit = async (e) => {
        setIsLoading(true)
        setError(null)
        e.preventDefault()

        if(!(password === confirmPassword)) {
            setIsLoading(false)
            return setError("Passwords do not match")
        }

        const response = await fetch('https://tasker-5g7e.onrender.com/user/signup', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, email, password})
    })
        const data = await response.json()

        if(response.ok) {
            localStorage.setItem('user', JSON.stringify(data))
            setIsLoading(false)
            dispatch({type: 'LOGIN', payload: data})
        }

        if(!response.ok) {
            setIsLoading(false)
            setError(data.error)
        }
    }

    return (
        <div className="custom_container">
            <div className="color-overlay d-flex justify-content-center align-items-center">
                <Form onSubmit={handleSubmit} className="rounded p-4 p-sm-3">
                    <Form.Group className="mb-3" controlId="formUsername">
                        <h1 className="form-header">Sign Up</h1>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="dark" type="submit" disabled={isLoading}>Sign Up</Button>
                    </div>
                    <Form.Group>
                        <Form.Text>Already have an account? <a href="/login" className="link-primary">Log In</a></Form.Text>
                    </Form.Group>
                    {error && <Alert variant="danger"><div>{error}</div></Alert>}
                </Form>
            </div>
        </div>
    )
}