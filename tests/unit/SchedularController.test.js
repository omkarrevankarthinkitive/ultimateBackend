const {getSlotMedia}=require("../mock-data/doctors/schedularMocks")


const slots=[
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-13",
        "startTime": "16:00",
        "endTime": "16:45"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-13",
        "startTime": "16:45",
        "endTime": "17:30"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-13",
        "startTime": "17:30",
        "endTime": "18:15"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-13",
        "startTime": "18:15",
        "endTime": "19:00"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-13",
        "startTime": "19:00",
        "endTime": "19:45"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-13",
        "startTime": "21:00",
        "endTime": "21:45"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-13",
        "startTime": "21:45",
        "endTime": "22:30"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-16",
        "startTime": "16:00",
        "endTime": "16:45"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-16",
        "startTime": "16:45",
        "endTime": "17:30"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-16",
        "startTime": "17:30",
        "endTime": "18:15"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-16",
        "startTime": "18:15",
        "endTime": "19:00"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-16",
        "startTime": "19:00",
        "endTime": "19:45"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-16",
        "startTime": "21:00",
        "endTime": "21:45"
    },
    {
        "doctorId": "64105cb99dcac60133a2e5dd",
        "date": "2023-03-16",
        "startTime": "21:45",
        "endTime": "22:30"
    }
]




 //add doctor
 describe('get slots', () => {
    test('getSlots',() => {
        expect(getSlotMedia()).toStrictEqual(slots);
      },30000)
  });   
