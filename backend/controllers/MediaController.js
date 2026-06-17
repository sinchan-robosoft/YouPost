const asyncHandler = require("async-handler");

const savePostOfUser = asyncHandler( async (req,res) => {
    try{
        
        const byteArray = Object.values(req.body.fileBytes);
        console.log(byteArray)
        console.log("api is hit")
        res.status(200).json({message : "successfully api hit",stackTrace : "",data : []});
    }
    catch(err){
        res.status(200).json({message : "error occured",stackTrace : "",data : []});
    }
});

module.exports = {savePostOfUser}