const mongoose = require('mongoose');
const express = require('express');
const backend = express();
const cors = require('cors');
backend.use(express.json());
const routes = require('./routes/index.js')
const dotenv = require("dotenv");
dotenv.config();
//step 2 - allow frontend 
backend.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "https://smart-stock-manager-shubham-devs-projects-0d08649b.vercel.app/"],
    methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
}))

//step3 - goto routes
backend.use(routes);

//step 1 - connext with mongodb
console.log("Mongo URI:", process.env.MONGO_URL);
// const conn = "mongodb+srv://shubham:shubham@cluster-ssm.n7nro2x.mongodb.net/"
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        const PORT = process.env.PORT || 5002;
        backend.listen(PORT, () => {
            console.log(`connect with mongodb`);
            console.log(`http://localhost:${PORT}/`);
        })
    })
    .catch((error) => {
        console.log(error)
        console.log("heoil")
    })





// const mongoose = require('mongoose');
// const express = require('express');
// const cors = require('cors');
// const chief = express();
// const http = require('http').Server(chief)

// // const routes = require("./routes")
// // same
// // const routes = require("./routes/index")


// chief.use(express.json())

// chief.use(cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"],
//     methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
// }))

// // chief.use(routes)

// // step1 to connect to database
// mongoose.connect("mongodb+srv://shubham:shubham@cluster-ssm.n7nro2x.mongodb.net/")
//     .then(() => {
//         const PORT = 5001;
//         chief.listen(PORT, () => {
//             console.log(`http://localhost:${PORT}`);
//             console.log(`server connected and run`);
//         })
//     })
//     .catch(() => {
//         console.log(`Error`);
//     })


