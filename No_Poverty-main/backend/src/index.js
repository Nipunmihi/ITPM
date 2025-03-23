require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Importing route handlers for various functionalities
const FinancialRoute = require("./routes/financial_routes");
const JobHireRoute = require("./routes/jobHire_routes");
const JobFindRoute = require("./routes/jobFind_routes");
const EventRoute = require("./routes/event_routes");
const EventUser = require("./routes/event_regiter_routes");
const RegisterUsers = require("./routes/register_routes");
const courseRoutes = require("./routes/course_routes");  // Course-related routes
const Donations = require("./routes/donate_routes");
const adDonation = require("./routes/adsDonate_routes");
const authRoutes = require("./routes/auth_routes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/auth");

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Cookie routes for testing purposes
app.get("/set-cookies", (req, res) => {
  // Sets cookies to track user state
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.send("you got the cookies!");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies); // Sends the current cookies to the client
});

// Course-related route setup
// Here the app is using the routes defined for course-related functionalities
// These routes will handle actions like creating, reading, updating, deleting courses, and enrolling users
app.use("/courses", courseRoutes); // Mapping '/courses' to courseRoutes handler

// Other routes (Financial, JobHire, Donations, etc.) and authentication setup
app.use("/financial", FinancialRoute);
app.use("/jobHire", JobHireRoute);
app.use("/jobFind", JobFindRoute);
app.use("/event", EventRoute);
app.use("/event-registration", EventUser);
app.use("/regiUser", RegisterUsers);
app.use("/donation", Donations);
app.use("/adDonations", adDonation);
app.use("/auth", authRoutes);
app.use("/", requireAuth);

// Connect to MongoDB using the connection URI from the environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // Listen for requests on the specified port after DB connection is successful
    app.listen(process.env.PORT, () => {
      console.log("listening for port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
