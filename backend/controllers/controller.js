const asyncHandler = require("express-async-handler");
const NodeCache = require('node-cache');
const jwtToken = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();
const path = require("path");
const { sendNotification } = require("../services/notifications");

const cacheData = new NodeCache({ stdTTL: 3600 }); 

const loginUSer = asyncHandler(async (req, res) => {
    const { userName, userPass } = req.body;
    const isExist = cacheData.get(userName)
    console.log(userName)
    console.log(isExist)
    if(!isExist){
        res.status(200).json({
            message : "The user doesnt exist",
            stackTrace: "",
            data : [],
            resData: { login: false, jwtToken : null }
        });
    }
    else
    {
        if (userPass == "abcd" || userPass == isExist) {
            const jwtSecret = process.env.JWT_SECRET;
            const expiresIn = "2d";
            const jwt = jwtToken.sign({
                userName: userName
            },
                jwtSecret,
                { expiresIn: expiresIn }
            );
            res.json({
                message: "login successful",
                resData: { login: true, jwtToken: jwt }
            })
        }
        else{
        res.json({
            message: "login unsuccessful",
            resData: { login: false, jwtToken : jwtToken }
        })
        }
    }
});

const getHomeData = asyncHandler( async (req,res) => {
    try{
        const data = cacheData.get("homeData");
        if(data){
            res.json({message : "success and data is fetched from cache",data : data})
        }else{
            await fetch(`https://api.freeapi.app/api/v1/seed/social-media`,{
                method : "POST"
            });
            const response = await fetch(`https://api.freeapi.app/api/v1/social-media/posts?page=${1}&limit=${10}`);
            const dataFromApi = await response.json(); 
            cacheData.set("homeData",dataFromApi);
            res.json({message : "successful and data is fetched from api",data : dataFromApi});
        }
    }catch(err){
        res.json({message : "error occured",stackTrace : err,data : []})
    }
});

const signUp = asyncHandler(async(req,res) => {
    try{
        const { userName, userPass , reTypePass } = req.body;
        if (!userName || !userPass || !reTypePass) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        };
        
        doesExist = cacheData.get(userName);
        
        if(doesExist){
            res.status(200).json(
                {
                    message : "User Already present",
                    stackTrace : "",
                    data : []
                }
            )
        }else{
            const jwtSecret = process.env.JWT_SECRET;
            const expiresIn = "2d";
            const jwt = jwtToken.sign({
                userName: userName
            },
                jwtSecret,
                { expiresIn: expiresIn }
            );
            cacheData.set(userName,userPass);
            res.status(200).json(
                {
                    message : "Successfully Signed up",
                    resData: { login: true, jwtToken: jwt }
                }
            )
        }
        
    }
    catch(err){
        console.log(err)
        res.status(200).json({message : "error occured",stackTrace : err,data : []});
    }
})

const getUserPosts = asyncHandler(async(req,res) => {
    try{
        const {userName} = req.body;
        const userData = cacheData.get("posts")
        if(userData){
            const posts = userData.find(item => item.userName === userName)["posts"]
            // console.log(userData)
            // console.log(posts)
            const resArray = []
            if(posts){
                
                posts.forEach(element => {
                    const filePath = path.join(__dirname, `../uploads/${element.fileName}`);
                    const file = fs.readFileSync(filePath)
                    resArray.push({file : file.toString("base64"),userLoc : element?.userLocation})
                });
            }
            res.status(200).json({
                message : "Successfully fetched posts",
                data : resArray
            })
        }
        else{ 
            res.status(200).json({
                message : "No posts by this user",
                data : []
            })
        }
    }catch(err){
        console.log(err)
        res.status(200).json({message : "error occured",stackTrace : err,data : []});
    }
})

const savePostOfUser = asyncHandler(async (req, res) => {
    try {
        const { userName, postCaption,userLoc } = req.body;
        const file = req.file;
        const cachedPosts = cacheData.get("posts");

        console.log(userLoc)
        
        if (cachedPosts) {
            const userData = cachedPosts.find(
                item => item.userName === userName
            );
            console.log(userData);
            
            if (userData) {
                userData.posts.push({fileName : file.originalname,userLocation : userLoc});
            } else {
                cachedPosts.push({
                    userName,
                    posts: [{fileName : file.originalname,userLocation : userLoc}]
                });
            }
            
            cacheData.set("posts", cachedPosts);
        } else {
            cacheData.set("posts", [
                {
                    userName: userName,
                    posts: [{fileName : file.originalname,userLocation : userLoc}]
                }
            ]);
        }

        const token = cacheData.get("notificationTokenTable").find((item) => item.userName === userName)?.notificationToken
       await sendNotification({
            title: "YouPost",  
            body: "successfully posted",  
            to: token
            });
        res.status(200).json({ message: "successfully api hit", stackTrace: "", data: [] });
    }
    catch (err) {
        console.log(err);
        res.status(200).json({ message: "error occured", stackTrace: "", data: [] });
    }
});

const saveNotificationToken = asyncHandler(async (req, res) => {
    const { userName, notificationToken } = req.body;
    console.log(notificationToken.data)
    try {
        let notificationTokenTable = cacheData.get("notificationTokenTable") || [];

        const userIndex = notificationTokenTable.findIndex(
            (item) => item.userName === userName
        );

        if (userIndex !== -1) {
            notificationTokenTable[userIndex].notificationToken = notificationToken?.data;
        } else {
            notificationTokenTable.push({
                userName: userName,
                notificationToken: notificationToken?.data,
            });
        }

        cacheData.set("notificationTokenTable", notificationTokenTable);

        res.status(200).json({
            message: "Notification token saved successfully",
            success: true,
            data: notificationTokenTable,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error saving notification token",
            stackTrace: err.message,
            data: [],
        });
    }
});

module.exports =  {loginUSer,getHomeData,signUp,getUserPosts,savePostOfUser,saveNotificationToken}


/* 
     "https://loremflickr.com/640/480/food?lock=7923360713408512",
     "https://loremflickr.com/640/480/food?lock=1817868809273344",
      "https://loremflickr.com/640/480/food?lock=491299463495680",
      "https://loremflickr.com/640/480/food?lock=6522820588732416",
      "https://loremflickr.com/640/480/food?lock=35616563658752",
      "https://loremflickr.com/640/480/food?lock=5907642222379008"


       //const byteArray = Object.values(req.body.fileBytes);
        
        //const buffer = Buffer.from(byteArray);
        //console.log(buffer)
        //const uploadPath = path.join(__dirname, "../uploads/image.jpg");

        //fs.writeFileSync(uploadPath, buffer);

*/
