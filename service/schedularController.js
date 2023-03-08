const Schedular = require("../models/schedularModel");
const moment = require("moment");
const { first } = require("lodash");
const {Doctor}=require("../models/doctorDetailModel");
const { func } = require("joi");
const createAppointment = async (req, res) => {
  try {
    const { doctor, startTime, endTime } = req.body;

    if (!(doctor && startTime && endTime)) {
      return res.status(400).json({
        status: "fail",
        message: "All inputs are required",
      });
    }

    function generateTimeSlots(timeRange) {
      const [startTime, endTime] = timeRange.split('-');
      const startDate = new Date(`1970/01/01 ${startTime}`);
      const endDate = new Date(`1970/01/01 ${endTime}`);
      const timeSlots = [];
    
      while (startDate < endDate) {
        const startTimeSlot = startDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        startDate.setMinutes(startDate.getMinutes() + 30);
        const endTimeSlot = startDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        timeSlots.push(`${startTimeSlot}-${endTimeSlot}`);
      }
    
      return timeSlots;
    }
    

    const docDetails=await Doctor.findById(doctor) 

   const firstHalf = docDetails.firstHalf
   const secondHalf= docDetails.secondHalf

   const timeSlotOne=generateTimeSlots(firstHalf)
   const timeSlotTwo= generateTimeSlots(secondHalf)
 
  //  console.log(timeSlotOne,"timeslot")
  //  console.log(timeSlotTwo,"timeSLot2")

   timeSlotAll=[...timeSlotOne,...timeSlotTwo]
   console.log(timeSlotAll)

   function isTimeSlotAvailable(timeSlot) {
    
    if (timeSlotAll.includes(timeSlot)) {
      res.send("Your appointment has been set")
      return;
    } else {
      res.send("doctor is not available")
      return;
    }
    
  }
const newTime=req.body.startTime +"-" + req.body.endTime
console.log(newTime,"ewwww")

  isTimeSlotAvailable(newTime)
  




    const convertedDate = await convertDate(startTime);
    const convertEndDate = await convertDate(endTime);

    

    // Check if appointment is outside doctor's working hours
    const appointmentStart = moment(convertedDate);
    const appointmentEnd = moment(convertEndDate);
    const workStart = moment("11:00 AM", "hh:mm");
    const workEnd = moment("19:00 PM", "hh:mm");
    if (
      appointmentStart.isBefore(workStart) ||
      appointmentEnd.isAfter(workEnd)
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Appointment is outside doctor's working hours",
      });
    }


1
    // Check if appointment is during the doctor's break time
    const breakStart = moment("14:00 PM", "hh:mm");
    const breakEnd = moment("15:00 PM", "hh:mm");
    if (
      appointmentStart.isBetween(breakStart, breakEnd,null,"[]") ||
      appointmentEnd.isBetween(breakStart, breakEnd,null,"[]")
    ) {
      return res.status(400).json({
        status: "fail",
        message: "Appointment is during the doctor's break time",
      });
    }

    // Check if appointment is within available slots
    const availableSlots = [
      ["11:00", "11:30"],
      ["11:30", "12:00"],
      ["12:00", "12:30"],
      ["12:30", "13:00"],
      ["13:00", "13:30"],
      ["15:00", "15:30"],
      ["15:30", "16:00"],
      ["16:00", "16:30"],
      ["16:30", "17:00"],
      ["17:00", "17:30"],
      ["17:30", "18:00"],
      ["18:00", "18:30"],
      ["18:30", "19:00"],
    ];
    const slotIndex = availableSlots.findIndex(
      (slot) =>
        moment(slot[0], "hh:mm A").isSameOrBefore(appointmentStart) &&
        moment(slot[1], "hh:mm A").isSameOrAfter(appointmentEnd)
    );
    if (slotIndex === -1) {
      return res.status(400).json({
        status: "fail",
        message: "Appointment slot not available",
      });
    }

    // Check if appointment overlaps with an existing appointment
    const existingAppointments = await Schedular.find({
      startTime: { $lte: convertedDate },
      endTime: { $gte: convertEndDate },
      doctor: doctor,
    });
    if (existingAppointments.length > 0) {
      return res.status(409).json({
        status: "fail",
        message: "Appointment overlaps with an existing appointment",
      });
    }

    // Create new appointment
    const appointment = await Schedular.create({
      doctor: doctor,
      startTime: convertedDate,
      endTime: convertEndDate,
    });

    return res.status(201).json({
      status: "success",
      message: "Appointment created",
   

      appointment: appointment,
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};


const receiveAppointment=async(req,res)=>{
try {
 const receivedApt=await Schedular.find({})
 res.send(receivedApt)
} catch (error) {
  res.send(error.message)
}


}

async function getSlot(req,res){

try {

  const doctor=req.query.doctorID
  const startDate=req.query.startDate
  const endDate=req.query.endDate
  const docDetails=await Doctor.findById(doctor) 
  const firstHalf = docDetails.firstHalf
  const secondHalf= docDetails.secondHalf
  const intervlbtn=docDetails.slotDuration
  const allWorkingDays=docDetails.workingDays

let firstHalfSTart
let firstHalfEnd
let secondHalfStart
let secondHalfEnd

let currentDate=moment(startDate)
let result = [];


  function generateTimeSlots(timeRange, interval) {
    const [startTime, endTime] = timeRange.split('-');
    const startMoment = moment(`1970-01-01 ${startTime}`);
    const endMoment = moment(`1970-01-01 ${endTime}`);
    const timeSlots = [];
  
    while (startMoment < endMoment) {
      const startTimeSlot = startMoment.format('HH:mm');
      startMoment.add(interval, 'minutes');
      if (startMoment > endMoment) {
        break;
      }
      const endTimeSlot = startMoment.format('HH:mm');
      timeSlots.push(`${startTimeSlot}-${endTimeSlot}`);
    }
  
    return timeSlots;
  }

  const timeSlotOne=generateTimeSlots(firstHalf,intervlbtn)

  const timeSlotTwo= generateTimeSlots(secondHalf,intervlbtn)

  const AllTimeSlot=[...timeSlotOne,...timeSlotTwo]




  





function splitTimeSlot(timeRange){
  const [startTime, endTime] = timeRange.split('-');
   return [startTime,endTime]
}
const valuesTime1=splitTimeSlot(firstHalf)
const valuesTime2=splitTimeSlot(secondHalf)
firstHalfSTart=valuesTime1[0]
firstHalfEnd=valuesTime1[1]
secondHalfStart=valuesTime2[0]
secondHalfEnd=valuesTime2[1]







  const objBlock={
    doctorId:req.body.doctorID,
    firstHalfSTartTime:firstHalfSTart,
    firstHalfEndTime:firstHalfEnd,
    secondHalfStartTime:secondHalfStart,
    secondHalfEndTime:secondHalfEnd

  }
// res.send(objBlock)
  
while (currentDate.isSameOrBefore(endDate)) {
  const dayOfWeek = currentDate.format('dddd');
  if (allWorkingDays.includes(dayOfWeek)) {
    const date = currentDate.format('YYYY-MM-DD');
    AllTimeSlot.forEach(slot => {
      const [startTime, endTime] = slot.split('-');
      result.push({ doctorId:req.query.doctorID,date, startTime, endTime });
    });
  }
  currentDate.add(1, 'day');
}

await res.send(result)

  
  
  
  

  // console.log(timeSlotOne,"timessslot")


  // timeSlotAll=[...timeSlotOne,...timeSlotTwo]

  
// function getWorkingDays(workingDays){

// // Get today's day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
// const today = moment().day();

// // Calculate the start and end dates for the current week, based on today's date
// const startDate = moment().startOf('week').add(today, 'days');
// const endDate = moment().endOf('week').add(today, 'days');

// // Create an array of dates for the current week, based on the working days
// const dates = [];
// let currentDate = startDate.clone();
// while (currentDate <= endDate) {
//   const dayOfWeek = currentDate.format('dddd');
//   if (workingDays.includes(dayOfWeek)) {
//     dates.push(currentDate.clone().toDate());
//   }
//   currentDate.add(1, 'days');
// }
// return dates
// }
//   const allthisis= getWorkingDays(allWorkingDays)
// console.log(allthisis,"thisis")
   
//    res.send(timeSlotAll)



  
} catch (error) {
  res.send(error.message)
  
   

}
   





}


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
  receiveAppointment,
  getSlot
};
