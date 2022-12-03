const cors = require("cors")
const express = require("express");
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 

app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use(express.json({type: "*/*"}))

app.use(express.static(path.resolve(__dirname, './client/build')));


let messages = [{id: 1, user: "owner", message: "Welcome!"}]


app.get("/api", (req, res) => {
  res.json(messages);
});


app.post("/api", (req, res) => {
  let message = req.body

  if (message.message == "//clear"){messages.length = messages.length - messages.length + 1}
  else if (!message.user){message.user = "guest"; messages.push(message)}
  else messages.push(message)
  if (message.message == "//bomb"){;setTimeout(()=> {xd(message)}),10000}
  if (message.message == "//screemer"){setTimeout(()=> {xd(message)}),10000}
});

async function xd (message) {  await delay(3000);
  let bomb = message.id - 1 
 messages.splice(bomb,1)
}

// Todas las peticiones GET que no hayamos manejado en las líneas anteriores retornaran nuestro app React
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)})