import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import My404Page from "./pages/error404page.js";
import Tasks from "./pages/tasks.js";
import Login from "./pages/login.js";
import SignUp from "./pages/signup.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthContext } from "./hooks/useAuthContext.js";

function App() {
  const { user } = useAuthContext()
  // console.log(window.location.href)
  // console.log(user)
  return (
    <>
      <Router>
          <Routes>
              <Route path="/" element={<Home user={user}/>}></Route>
              <Route path="/tasks" element={<Tasks />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="*" element={<My404Page />}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;

