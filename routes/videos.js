
const express =require("express");
const router=express.Router();
const { v4:uuidv4 } =require("uuid");
const fs=require("fs");
const multer =require("multer");// middleware that helps to handle the uploads 

const storage =multer.discStorage({
    destination:function(req, file, cb){
        cb(null, "public/images" )// file saved
    
    },
    filename:function(req,file,cb){
        cb(null, file.fieldname + "-" + Date.now()+ path.extname(file.originalName) )
    } 
});

const upload =multer({
    storage:storage,
    limits:{fileSize: 1024 * 1024 * 10}
})

const writeToFile=(videos)=>{
   fs.writeFileSync("./data/videos.json", JSON.stringify(videos,null,2)) 
}

const readVideosFromFile=()=>{
    const videoData= fs.readFileSync("./data/videos.json")
    return JSON.parse(videoData)
}
//Get /videos: the list of all videos
app.get("/videos", (req, res)=>{
    const videos=readVideosFromFile();
res.json(videos.map(video =>({
    id: video.id ,
    title: video.title ,
    channel :video.channel,
    image :video.image, 
}))
)
} )


//Get the details for the selected video- video id
app.get("/videos:id", (req, res)=>{
    const videos=readVideosFromFile();
 const video=videos.find(video =>{
        video.id===req.params.id
        if (video){
            res.json(video)
        }else{
            res.status(400).send("video not found")
        }
    })
})
//Post new video 
app.post("/videos", (req, res)=>{
    const videos=readVideosFromFile();
    const newVideo={
        id: uuidv4(),
        title: request.body.title,
        channel: "Maryna Plp ",
        image: `/images/${request.file.filename}`,
        description: request.body.description,
        views: 0,
        likes: "0",
        duration: "1:10",
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: []
    }
    videos.push(newVideo)
    writeToFile(videos)
    res.status(201).json(newVideo)
})

.app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port} `);
})

