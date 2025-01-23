const express =require("express");
const app = express();
const port = 5798;

console.log("yeet");

app.use(express.json());

const data ={
users:[
{name:"John", age: 30},
{name:"Doe", age: 25},

]



}

app.get("/",(req,res)=>{
res.send(`
  <body style= "background:grey; color:white">
  <h1>Data</h1>
  <p>${JSON.stringify(data)}</p>
  <a href="/dashboard">Dashboard</a>
  </body>
  
  
  `)


})

app.get('/dashboard',(req,res)=>{
  res.send(`
    <body>
    <h1>DashBoard</h1>
    <a href="/">Home</a>
    </body>`
  )
})

app.get('/api/data',(req,res)=>{
  res.send(data);
})

app.post('/api/data',(req,res)=>{
  const newEntry = req.body;

  if (!newEntry.name || !newEntry.age){
    return res.status(400).send("Invalid Entry");
  }

  data.users.push({name:newEntry.name, age:newEntry.age});
  console.log("updated data", data);
  res.status(201).send("Data added successfully")

})


app.delete ('/api/data',(req,res)=>{
  const name =req.body.name;
  if(!name){
    return res.status(400).send("Invalid data structure. please provide a name")
  }
  const userIndex = data.users.findIndex(user=> user.name === name)
  if(userIndex === -1){
    return res.status(404).send("User not found")

  }
  data.users.splice(userIndex,1)
  console.log("Updated Data;", data)
  res.send("User deleted successfully")
})
app.listen(port, () => console.log(`Server has started on ${port}`));

