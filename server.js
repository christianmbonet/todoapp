const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path')


const app = express();
const connectDB = require("./server/config/db");

const todo = require("./server/routes/todo");

connectDB();

app.use(cors({ origin: true, credentials: true })); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todo", todo);

app.get("/", (req, res) => res.send("Server up and running"));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
}

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
