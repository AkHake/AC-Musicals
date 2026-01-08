const connectToMongo = require("./db.js");

connectToMongo();
const express = require("express");
var cors = require("cors");
const app = express();
const port = 5001;

// app.use: This method is used to mount middleware functions or routers in your Express application.

// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  credentials: true // Allow cookies if needed
}));

app.use(express.json());

//Available Routes
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/product/", require("./routes/products"));
app.use("/api/cart/", require("./routes/cart"));
app.use("/api/", require("./routes/order"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Musical Instrument app listening on port ${port}`);
});

//  "start": "nodemon index.js"
