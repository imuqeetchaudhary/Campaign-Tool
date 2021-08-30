const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dbConnect = require("./utils/dbConnect");
const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaign");
const campaign = require("./routes/campaign");
const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const cors = require("cors");

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enable...");
}

app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Campaign Tool Rest Api" });
});

app.use("/auth", authRoutes);
app.use("/campagin", campaignRoutes);
app.use("/campaign", campaign);
app.use("/user", userRoutes);
app.use("/company", companyRoutes);

const port = process.env.PORT || "8000";
app.listen(port, () => {
  console.log(`App is Listening to ${port}`);
});
