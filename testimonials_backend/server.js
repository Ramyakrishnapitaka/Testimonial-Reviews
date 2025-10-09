var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var userModel=require("./models/signup.model");
var reviewModel=require("./models/reviews.model")
var cors=require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
require('dotenv').config()


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("db connected"))
.catch(res=>console.log("db not connected"))

app.get("/",(req,res)=>{
    userModel.find({}).then(data=>{res.send(data);})
    
})
app.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new userModel({ email, username, password });
    await newUser.save();

    
    res.status(200).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password }); 
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const { username, content, profile } = req.body;
    const newReview = new reviewModel({
      username,
      content,
      profile,
      date: new Date(),
    });

    const saved = await newReview.save();
    res.status(201).json(saved); 
  } catch (err) {
    res.status(500).json({ error: "Failed to save review" });
  }
});

app.get("/api/reviews", async (req, res) => {
  const reviews = await reviewModel.find().sort({ date: -1 });
  res.json(reviews);
});



const PORT=process.env.PORT||4900
app.listen(POST,()=>{
    console.log("Server is connected successfully");
})
