const express = require ("express");
const app =express();
const cors= require("cors")
const videoRoutes= require("./routes/videos")


//configuration
require("dotenv").config();
const PORT =process.env.PORT || 3030;

//Middleware
app.use(cors())
app.use(express.static("public/images"))
app.use(express.json());

//routes
app.use("/videos", videoRoutes);

app.listen(Port, ()=>{
    console.log(`The server is listening the ${PORT}`)
})

