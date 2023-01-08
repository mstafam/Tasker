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

  //maybe an if stattemnet for the user is null, if its not then return this and 
  // navigate them to the home if they go on the loging or singup
  // amd if it is null, then navigate them to signup if they go another page. 
  // or do the if statement and if theri is a user do a {user && user...} so it waits for it
  
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

