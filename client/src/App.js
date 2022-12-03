import React, { useState } from "react";
import {Route, Routes,BrowserRouter as Router} from "react-router-dom"
import Register from "./Components/Register";
import Chat from "./Components/Chat"
import { Error } from "./Components/Error";


function App() {

  const [name, setname] = useState(null) 

  return (
    
    <Router>
      <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/chat" element={<Chat/>}/>
          <Route path="/*" element={<Error/>}/>
      </Routes>
    </Router>

  )
}

export default App;
