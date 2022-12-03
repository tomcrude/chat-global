import React, {  useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

export default function Register() {
    

    const navigate = useNavigate()

    const [active, setactive] = useState(true)

    const [repit, setrepit] = useState([])

    const [name, setname] = useState("")

    const [x, setx] = useState(0)


    useEffect(()=>{
      
      fetch("/api")
      .then(res => {return res.json()})
      .then(respo => setrepit(respo))
      
  

    })

    window.localStorage.setItem("user", "")

    return (
    <div className="container text-center mt-5 register">

    

      <div className="row">
    <h1 className="col-12 mt-5 title">Global Chat</h1>
    <h2 className="col-12 mt-5">Insert your name</h2>
    <form>
        <input placeholder="Max 10 characters" className="col-12 mt-3 input text-center" required onChange={(e)=>{setname(e.target.value)}} type="text" />
        <input className="col-12 mt-4 buton" type="submit" onClick={async (e)=>{
          e.preventDefault()
          
        
          if (!name){document.querySelector(".error").innerHTML = "Enter a name";setactive(false)}
          else if (name.length > 10){document.querySelector(".error").innerHTML = "The name must not contain more than 10 characters"
           ;setactive(false)}
          else{
          repit.map((stat)=>{
            if (name === stat.user){setx(2); window.location.reload();}
            if (stat.id === repit.length && x === 0) {window.localStorage.setItem("user", name);navigate('/chat')}
          })}
          
          setx(0)
          
          }} />
    </form>
    <h3 className={active ? "col-12 mt-5 error inactive" : "col-12 mt-5 error"}>Please choose a correct name</h3>
    </div>
    </div>
  )

}


