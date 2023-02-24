


const {doctordetailFunction,searchDoctorFunction,addoctorFunction}=require(".././mock-data/doctors/doctorMock")




const addDoctorObj={
    "doctorName": "tony stark",
    "qualification": [
        "scientist"
    ],
    "Gender": "M",
    "clinicName": "jarvis",
    "email": {
        "_id": "63ad7bfb68b027746328964e",
        "name": "mobi",
        "email": "mobiDick@gmail.com",
        "password": "$2b$10$lX7CGXbBRe4U4b/Msj3Szekr5.mySR8/FfoL1yClcCZvDPMOnoBiS",
        "role": "Admin",
        "phoneNumber": "1222221222",
        "__v": 0
    },
    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xRp6xbJvA76_UVFgfOjLNVODLcZpZIfwjg&usqp=CAU",
    "phoneNumber": "1231231231",
    "aboutMyself": "I'm not even doctor who put my name here",
    "_id": "63f36eb8efe3e919482bde21",
    "__v": 0
}





const searchDocObj=[
    {
        "_id": "63f36eb8efe3e919482bde21",
        "doctorName": "tony stark",
        "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2xRp6xbJvA76_UVFgfOjLNVODLcZpZIfwjg&usqp=CAU"
    }
]

const getDoctor={
    "_id": "63c12a27c62dce66b38d44af",
    "doctorName": "black widow",
    "qualification": [
        "MD"
    ],
    "Gender": "M",
    "clinicName": "Shield",
    "email": "63ad7bfb68b027746328964e",
    "img": "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Scarlett_Johansson_as_Black_Widow.jpg/220px-Scarlett_Johansson_as_Black_Widow.jpg",
    "phoneNumber": "1231231231",
    "aboutMyself": "I'm an MD from shield and i'm an secret agent keep that one secret.",
    "__v": 0
}





 //add doctor
 describe('add doctor', () => {
    test('addDoctor',() => {
        expect(addoctorFunction()).toStrictEqual(addDoctorObj);
      },30000)
  });   

  //search doctor

 describe('search doctor', () => {
    test('searchDoctor',() => {
        expect(searchDoctorFunction()).toStrictEqual(searchDocObj);
      },30000)
  });   

  //get doctors

  describe('get doctor', () => {
    test('getDoctor',() => {
        expect(doctordetailFunction()).toStrictEqual(getDoctor);
      },30000)
  });   

  
  




