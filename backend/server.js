
const express = require("express")
const cors = require("cors")
const routes = require("./Routes/handleRoutes")
const {upload} = require("./Multer/Multer")

const app = express();

// app.use(cors({
//   origin: "http://192.168.1.105:8081"
// }));

app.use(cors())
app.use(express.json({
  limit: "100mb"
}));
app.listen(5000,()=>{
    console.log("server is running on port 5000")
});

app.use("/api",routes)


