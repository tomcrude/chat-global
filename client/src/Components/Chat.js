
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useRef} from 'react';
import {Howl} from "howler"


export default function Register() {
  const audio = require("./pin.mp3")
  const audio2 = require("./pin2.mp3")



  const navigate = useNavigate()

  const [mensaje, setmensaje] = useState([]);

  const [message, setmessage] = useState("");

  const [histori, sethistori] = useState([]);

  const [event, setevent] = useState(0);

  useEffect( ()=>{
     fetch("/api")
    .then(res => {return res.json()})
    .then(respo => setmensaje(respo))
    const lastmessage = histori[4]
    if (histori.length === 5){window.location.reload(true);  window.localStorage.setItem("his",  lastmessage)}
   ref.current?.scrollIntoView()


  })



  const ref = useRef(null);
  const refe = useRef(null);

  return (
    <>

    <div className={event === 1 ? "screemer" : "inactive"}></div>
    
    <audio src={audio} className="audiox"></audio>

    <div className={ event === 2 ? "container bomb" : "container"}>
     <button onClick={()=>{navigate("/")}} className="col-12 change">Change the name</button>
      <div className="mt-4 border border-dark chat pt-3">
      {
        mensaje.map((stat)=>{
          
          if( stat.message === "//screemer"){setTimeout (async()=>{
            const sound = new Howl({
              src: audio
            })
            sound.play();
           setevent(1)
        },200); setTimeout (()=>{setevent(0)},3000) ;}
          if( stat.message === "//bomb"){setTimeout (()=>{const sound2 = new Howl({
            src: audio2
          }
          
          )
          sound2.play(); setevent(2)},200); setTimeout (()=>{setevent(0)},3000) ;}
          else return (
            <div className="row" key={stat.id}>
            <p className={stat.user === "owner" ? "col-md-2 col-4 text-center owner" : "col-md-2 col-4 text-center"}>{stat.user} :</p>
            <p ref={Math.max(mensaje.length) === stat.id ? ref : refe} className="col-md-10 letter col-8">{stat.message}.</p>
            </div>
          )
        })
      }
    <div>
    </div>
    </div>
        <form className="row send mt-4 buton-2">
        <input placeholder="Max 80 characters" onChange={(e)=>{setmessage(e.target.value)}} className="mess col-12" type="text" />
        <button className="col-12 mt-4 buton-3" onClick={async (e)=>{
          e.preventDefault();
          if ( message.length > 80){window.alert("Max 80 characters")}
          else if (!message){}
          else 
          {
          
          document.querySelector(".mess").value = ""
          
          histori.push(message.toLowerCase())
          
           let count = histori.length;
          
            
          if (histori[count - 2] === histori[count - 1] ){window.alert("Don't repeat the same message");histori.pop()}
           else if (window.localStorage.getItem("his") === histori[0] ){window.alert("Don't repeat the same message")}
          else {await fetch("/api",{
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              id: mensaje.length + 1,
              user: window.localStorage.getItem("user"),
              message: message
            })
          })}

          setmessage(null)}

        }}>Send</button>
       
        </form>
       
    </div>
    </>
  )

}
