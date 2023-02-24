

let doc={
    
    
        "reason": "Feeling little sick today",
        "room": 1,
        "diagnosis": "Covid",
        "firstName": "David",
        "lastName": "Bowie",
        "gender": "M",
        "cellPhone": 1234567890,
        "email": "Indian@indian.com",
        "Province": "state",
        "city": "karad",
        "postalCode": "1234",
        "aptTime": "12:30",
        "aptDate": "12-30-22",
        "_id": "63f4af80f17cbf151682cf5c",
        "__v": 0
    
}


const getapt=[
    {
        "_id": "63ed2ffc0c10fb4e0d2eb58f",
        "reason": "jsklsl",
        "room": 1,
        "diagnosis": "Diarrhea",
        "firstName": "sdcscsdcs",
        "lastName": "sdcscsdcsdc",
        "gender": "Female",
        "cellPhone": 1223322332,
        "homePhone": 1231231234,
        "email": "omkar321@gmail.com",
        "Province": "123321",
        "city": "Sity",
        "postalCode": "ss",
        "aptTime": "02:51",
        "aptDate": "2023-02-09",
        "__v": 0
    },
    {
        "_id": "63edf50722489f808f780972",
        "reason": "feeling little pain in the stomouch",
        "room": 3,
        "diagnosis": "Chickenpox",
        "firstName": "john",
        "lastName": "mcnaughty",
        "gender": "Male",
        "cellPhone": 1231231231,
        "homePhone": 233455645,
        "email": "omkar321@gmail.com",
        "Province": "123212",
        "city": "miraj",
        "postalCode": "123123",
        "aptTime": "16:48",
        "aptDate": "2023-02-25",
        "__v": 0
    },
    {
        "_id": "63f4af80f17cbf151682cf5c",
        "reason": "Feeling little sick today",
        "room": 1,
        "diagnosis": "Covid",
        "firstName": "David",
        "lastName": "Bowie",
        "gender": "M",
        "cellPhone": 1234567890,
        "email": "Indian@indian.com",
        "Province": "state",
        "city": "karad",
        "postalCode": "1234",
        "aptTime": "12:30",
        "aptDate": "12-30-22",
        "__v": 0
    },
    {
        "_id": "63f4b8667f2dba160620041f",
        "reason": "Feeling little sick today",
        "room": 1,
        "diagnosis": "Covid",
        "firstName": "David",
        "lastName": "Bowie",
        "gender": "M",
        "cellPhone": 1234567890,
        "email": "Indian@indian.com",
        "Province": "state",
        "city": "karad",
        "postalCode": "1234",
        "aptTime": "12:30",
        "aptDate": "12-30-22",
        "__v": 0
    }
]


const serchApt=[
    {
        "_id": "63ed2ffc0c10fb4e0d2eb58f",
        "reason": "jsklsl",
        "room": 1,
        "diagnosis": "Diarrhea",
        "firstName": "sdcscsdcs",
        "lastName": "sdcscsdcsdc",
        "city": "Sity",
        "aptTime": "02:51",
        "aptDate": "2023-02-09"
    }
]

function postAppointmentMedia(){
    return (
        doc
    )
}

function getAppointmentMedia(){
    return(
        getapt
    )
}

function searchAppointment(){
    return (
        serchApt
    )
}


module.exports={postAppointmentMedia,getAppointmentMedia,searchAppointment}

