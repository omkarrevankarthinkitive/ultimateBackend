const { Schedular, validateSchedule } = require("../models/schedularModel");
const moment = require("moment");
const { Doctor } = require("../models/doctorDetailModel");

const { Appointment } = require("../models/appointmentModel");

async function getSlot(req, res) {
  try {
    const { error } = validateSchedule(req.query);
    if (error) {
      throw new Error(error.message);
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

    const newArry = mappedAppt.map((item) => {
      const timeRange = `${item[0]}-${item[1]}`;
      return [timeRange, item[2]];
    });

    let workingStart;
    let workingEnd;

    let currentDate = moment(startDate);
    let result = [];

    function generateTimeSlots(timeRange, interval) {
      const [startTime, endTime] = timeRange.split("-");

      const startMoment = moment().startOf('day').add(moment.duration(startTime));

      const endMoment =moment().startOf('day').add(moment.duration(endTime));

      const timeSlots = [];

      while (startMoment < endMoment) {
        const startTimeSlot = startMoment.format("HH:mm");

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
              doctorId: doctor,
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
