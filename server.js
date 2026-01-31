const express = require("express");
const userRouter = require("./routes/userRoute");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const db = require("./models/index");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");
const logger = require('./helper/logger');
require('./jobs/test.job')
const app = express();
dotenv.config();

app.use(express.json());
app.use((req, res, next) => {
  logger.info(`${req.method}-${req.url}`)
  next();
})
app.use(express.urlencoded({ extended: true}))
app.use(errorHandler);

// api
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/post", postRouter);
app.use('/uploads', express.static("uploads"))

// DB connection
db.sequelize
  .authenticate()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log(`server is running on http://localhost:3000`);
});
