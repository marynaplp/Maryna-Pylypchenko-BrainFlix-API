const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); // Unique ID Generator
const fs = require("fs"); // fileSystem module
const multer = require("multer");

const videoData = require("../data/videos.json");

const PORT = 3010;

// Middleware to parse JSON bodies

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

const writeToFile = (videos) => {
  fs.writeFileSync("./data/videos.json", JSON.stringify(videos, null, 2));
};

const readVideosFromFile = () => {
  const videoData = fs.readFileSync("./data/videos.json");
  return JSON.parse(videoData);
};

// Get /videos: the list of all videos
router.get("/", (req, res) => {
  try {
    const videos = readVideosFromFile();
    res.json(
      videoData.map((videos) => ({
        id: videos.id,
        title: videos.title,
        channel: videos.channel,
        image: videos.image,
      }))
    );
  } catch (error) {
    console.error("Error reading videos file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get the details for the selected video - video id
router.get("/:id", (req, res) => {
  const videos = readVideosFromFile();
  const video = videos.find((video) => video.id === req.params.id);
  if (video) {
    res.json(video);
  } else {
    res.status(400).send("video not found");
  }
});

// Post new video
router.post("/", upload.single("image"), (req, res) => {
  const videos = readVideosFromFile();
  const newVideo = {
    id: uuidv4(),
    title: req.body.title,
    channel: "Maryna Plp",
    image: `/images/${req.file.filename}`,
    description: req.body.description,
    views: 0,
    likes: "0",
    duration: "1:10",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };
  videos.push(newVideo);
  writeToFile(videos);
  res.status(201).json(newVideo);
});

router.get("/", (req, res) => res.send("Video route works!"));

module.exports = router;
