const {Schedular,validateSchedule} = require("../models/schedularModel");
const moment = require("moment");
const { Doctor } = require("../models/doctorDetailModel");

const { Appointment } = require("../models/appointmentModel");

async function getSlot(req, res) {
  try {
    const { error } = validateSchedule(req.query);
    if (error) {
     throw new Error(error.message)
    }
    const doctor = req.query.doctorId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const docDetails = await Doctor.findById(doctor);

    const aptDetails = await Appointment.find();
    const workingTime = docDetails.workingTime; 
    const intervlbtn = docDetails.slotDuration;
    const allWorkingDays = docDetails.workingDays; 

    const mappedAppt = aptDetails.map((apptDetail) => {
      const main = [];
      if (apptDetail.doctorId === doctor) {
        main.push(apptDetail.startTime, apptDetail.endTime, apptDetail.date);
      }
      return main;
    });

    console.log(mappedAppt, "lllll");
    const newArry = mappedAppt.map((item) => {
      const timeRange = `${item[0]}-${item[1]}`;
      return [timeRange, item[2]];
    });

    console.log(newArry, "neweeddd array");
    let workingStart;
    let workingEnd;

    let currentDate = moment(startDate);
    let result = [];

    function generateTimeSlots(timeRange, interval) {
      const [startTime, endTime] = timeRange.split("-");
      console.log(startTime, "ssssaqqq");

      const startMoment = moment(`1970-01-01 ${startTime}`);

      console.log(startMoment, "startrtsssass");
      const endMoment = moment(`1970-01-01 ${endTime}`);
      const timeSlots = [];

      while (startMoment < endMoment) {
        const startTimeSlot = startMoment.format("HH:mm");

        console.log(startTimeSlot, "qqqqqqq");
        startMoment.add(interval, "minutes");

        if (startMoment > endMoment) {
          break;
        }
        const endTimeSlot = startMoment.format("HH:mm");

        timeSlots.push(`${startTimeSlot}-${endTimeSlot}`);
      }

      return timeSlots;
    }

    const timeSlotEvery = generateTimeSlots(workingTime, intervlbtn);

    console.log(timeSlotEvery, "weeesasas");

    function splitTimeSlot(timeRange) {
      const [startTime, endTime] = timeRange.split("-");
      return [startTime, endTime];
    }

    const valuesAll = splitTimeSlot(workingTime);
    workingStart = valuesAll[0];
    workingEnd = valuesAll[1];

    while (currentDate.isSameOrBefore(endDate)) {
      const dayOfWeek = currentDate.format("dddd");

      if (allWorkingDays.includes(dayOfWeek)) {
        const date = currentDate.format("YYYY-MM-DD");

        timeSlotEvery.forEach((slot) => {
          const [startTime, endTime] = slot.split("-");


          const skipSlot = newArry.find(
            (item) => item[0] === `${startTime}-${endTime}` && item[1] === date
          );
          if (!skipSlot) {
            result.push({
              doctorId: req.query.doctorID,
              date,
              startTime,
              endTime,
            });
          }
        });
      }
      currentDate.add(1, "day");
    }

    await res.send(result);
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  getSlot,
};
