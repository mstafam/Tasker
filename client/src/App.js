import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import My404Page from "./pages/error404page";
import Tasks from "./pages/tasks";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";

function App() {
  const { user } = useAuthContext()
  const [hasLoaded, setHasLoaded] = useState(false)

  useEffect(() => {
    setHasLoaded(true)
  }, [user])
  
  console.log(window.location.href)
  console.log(user)

  if(hasLoaded) {
    return (
      <>
        <Router>
            <Routes>
                <Route path="/" element={<Home user={user}/>}></Route>
                <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/login"/>}></Route>
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/tasks"/>}></Route>
                <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/tasks"/>}></Route>
                <Route path="*" element={<My404Page />}></Route>
            </Routes>
        </Router>
      </>
    );  
  }
}

export default App;

