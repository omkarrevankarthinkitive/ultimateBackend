require("dotenv").config();
const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db.js");

//ROUTE IMPORTS
const userRoutes = require("./routes/userRoutes.js");
const patientRoutes = require("./routes/patientRoutes.js");
const medicalHistoryRoutes = require("./routes/medicalHistoryRoutes.js");
const doctorDetailRoutes = require("./routes/doctorDetailsRoute.js");
const appointmentRoutes = require("./routes/appointmentRoute.js");

const cors = require("cors");

//THE DB CONNECTION
connectDB();

const app = express();
app.use(express.json());

app.use(cors());

//ROUTES

//USERS
app.use("/api/users", userRoutes);

//PATIENTS
app.use("/api/patient", patientRoutes);
app.use("/api/patient/medicalhistory", medicalHistoryRoutes);

//DOCTORS
app.use("/api/doctor/doctordetail", doctorDetailRoutes);

//APPOINTMENTS
app.use("/api/appointment", appointmentRoutes);

const PORT = process.env.PORT || 4222;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
