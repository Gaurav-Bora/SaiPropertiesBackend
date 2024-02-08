const express = require("express")
const app = express();

const bodyParser = require("body-parser")
const routesEnquiry = require("./routes/enquiry.js")
const routesState = require("./routes/location/state.js")
const routeUser = require("./routes/user.js")
const routeTeam = require("./routes/team")
const routeNewsLetter = require("./routes/newsLetter.js")
const routeProperties = require("./routes/properties.js")


const cors = require("cors")
app.use(cors(''));




app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));





app.use("/enquiry", routesEnquiry)
app.use("/state", routesState)
app.use("/user", routeUser)
app.use("/admin", routeTeam)
app.use("/news", routeNewsLetter)
app.use("/property", routeProperties)



app.listen(5000,()=>{
    console.log("server is running on port 5000")
})

