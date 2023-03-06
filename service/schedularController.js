const Schedular = require("../models/schedularModel");
const moment = require("moment");
const createAppointment = async (req, res) => {
  try {
    const { doctor, startTime, endTime } = req.body;

    if (!(doctor && startTime && endTime)) {
      return res.status(400).json({
        status: "fail",
        message: "All inputs are required",
      });
    }
    const convertedDate = await convertDate(startTime);
    const convertEndDate = await convertDate(endTime);
    console.log(convertedDate, "converted");
    // const existingAppointment = await Schedular.findOne({
    //     startTime: convertedDate,
    // });
    //    console.log(existingAppointment,"exists")
    const existingEndAppointment = await Schedular.findOne({
      endTime: convertEndDate,
    });

    console.log(existingEndAppointment, "end");
    let firstOne;
    let secondOne;
    existingEndAppointment && (firstOne = existingEndAppointment.startTime);
    existingEndAppointment && (secondOne = existingEndAppointment.endTime);

    let firstOneOne = await convertDate(firstOne);
    let secondOneTwo = await convertDate(secondOne);

    console.log(firstOneOne);

    // if (firstOne) {
    //   return res.status(409).json({
    //     status: "fail",
    //     message: "Appointment already existing",
    //   });
    // }

    const appointment = await Schedular.create({
      doctor: doctor,
      startTime: convertedDate,
      endTime: convertEndDate,
    });

    console.log(firstOneOne, "firstOeoe");
    console.log(startTime, "twwss");

    const appointmentDetail = await Schedular.findById(
      appointment._id
    ).populate("doctor");

    const checkAppointmentOverlap = (
      existingAppointmentStart,
      existingAppointmentEnd,
      newAppointmentStart,
      newAppointmentEnd
    ) => {
      const startMoment = moment.utc(newAppointmentStart);
      const endMoment = moment.utc(newAppointmentEnd);

      const existingStartMoment = moment.utc(existingAppointmentStart);
      const existingEndMoment = moment.utc(existingAppointmentEnd);
      console.log(
        startMoment.isBetween(existingStartMoment, existingEndMoment) ||
          endMoment.isBetween(existingStartMoment, existingEndMoment)
      );
      return (
        startMoment.isBetween(existingStartMoment, existingEndMoment) ||
        endMoment.isBetween(existingStartMoment, existingEndMoment)
      );
    };
    if (
      checkAppointmentOverlap(
        firstOneOne,
        secondOneTwo,
        convertedDate,
        convertEndDate
      )
    ) {
      res.send(
        "This appointment overlaps with an existing appointment and cannot be scheduled."
      );
      return;
    } else {
      res.send("This appointment is available and can be scheduled.");
      return;
    }

    return res.status(201).json({
      status: "success",
      message: "Appointment created",
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// const updateAppointment = async (req, res) => {
//   try {
//     const {doctor, disease, appointmentDate } = req.body;

//     if (!(id && patient && doctor && disease && appointmentDate)) {
//       return res.status(400).json({
//         status: "fail",
//         message: "All inputs are required",
//       });
//     }

//     const convertedDate = await convertDate(appointmentDate);

//     const existingAppointment = await Appointment.findOne({ _id: id });

//     if (!existingAppointment) {
//       return res.status(409).json({
//         status: "fail",
//         message: "Appointment not found",
//       });
//     }

//     const filter = { _id: id };
//     const data = { patient, doctor, disease, appointmentDate: convertedDate };

//     await Appointment.findOneAndUpdate(filter, data);

//     return res.status(201).json({
//       status: "success",
//       message: "Update successfull",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };

// const getAllAppointments = async (req, res) => {
//   try {
//     let currentPage = req.query.page || 1;
//     let appointmentsPerPage = 10;
//     // ..../appointments?page=1

//     let filter = {};
//     /*
//     const { userId, userRole} = req.user;
//     if(userRole=="patient"){
//         filter.patient = {"_id":userId}
//     }
//     if(userRole=="doctor"){
//         filter.doctor = {"_id":userId}
//     }
//     */

//     const appointments = await Appointment.find(filter)
//       .populate("patient", "-department -password")
//       .populate({
//         path: "doctor",
//         populate: {
//           path: "department",
//         },
//         select: "-password",
//       })
//       .populate({
//         path: "disease",
//         populate: {
//           path: "department",
//         },
//       })
//       .skip(appointmentsPerPage * (currentPage - 1))
//       .limit(appointmentsPerPage);

//     return res.status(200).json({
//       status: "success",
//       appointments,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };

// const getAppointmentById = async (req, res) => {
//   try {
//     const id = req.params.id;

//     if (!id) {
//       return res.status(400).json({
//         status: "fail",
//         message: "All input is required",
//       });
//     }

//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return res.status(409).json({
//         status: "fail",
//         message: "appointment id wrong",
//       });
//     }

//     const appointment = await Appointment.findById(id)
//       .populate("patient", "-department -password")
//       .populate({
//         path: "doctor",
//         populate: {
//           path: "department",
//         },
//         select: "-password",
//       })
//       .populate({
//         path: "disease",
//         populate: {
//           path: "department",
//         },
//       });

//     return res.status(200).json({
//       status: "success",
//       appointment,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error,
//     });
//   }
// };

// const updateAppointmentStatus = async (req, res) => {
//   const id = req.params.id;
//   const status = req.body.status;

//   if (!(id && status)) {
//     return res.status(400).json({
//       status: "fail",
//       message: "All input is required",
//     });
//   }

//   const conditionsArray = ["open", "rejected", "cancelled", "completed"];

//   if (conditionsArray.indexOf(status) === -1) {
//     return res.status(400).json({
//       status: "fail",
//       message: "Appointment status wrong",
//     });
//   }

//   if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//     return res.status(409).json({
//       status: "fail",
//       message: "Appointment id wrong",
//     });
//   }

//   const existingAppointment = await Appointment.findOne({ _id: id });

//   if (!existingAppointment) {
//     return res.status(409).json({
//       status: "fail",
//       message: "Appointment not found",
//     });
//   }

//   const filter = { _id: id };
//   const data = { appointmentStatus: status };

//   await Appointment.findOneAndUpdate(filter, data);

//   return res.status(201).json({
//     status: "success",
//     message: "Status update successfull",
//   });
// };

const convertDate = async (time) => {
  let appointmentDatex = moment.utc(time, "H:mm");
  return appointmentDatex.toISOString();
};

module.exports = {
  createAppointment,
};
