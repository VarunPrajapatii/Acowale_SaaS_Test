const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 3001;
const app = express();
// This is a 15 minutes window and it does limits the ip to 100 reqs in a window...
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later!!",
});

app.use(cors());
app.use(express.json());
app.use(limiter);

const rootRouter = require("./src/index");

app.use("/api", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
