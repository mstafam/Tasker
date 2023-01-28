import React, { useState } from "react";
import "../styles/authentication.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useAuthContext } from "../hooks/useAuthContext";
import Alert from 'react-bootstrap/Alert';

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const handleSubmit = async (e) => {
        setIsLoading(true)
        setError(null)
        e.preventDefault();
        const response = await fetch('https://tasker-5g7e.onrender.com/user/login', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
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
                            <h1 className="form-header">Log In</h1>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="dark" type="submit" disabled={isLoading}>Log In</Button>
                        </div>
                        <Form.Group>
                            <Form.Text>Don't have an account? <a href="/signup" className="link-primary">Sign Up</a></Form.Text>
                        </Form.Group>
                        {error && <Alert variant="danger"><div>{error}</div></Alert>}
                    </Form>
                </div>
        </div>
    )
}