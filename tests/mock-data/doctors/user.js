

const registerUser={
    "name": "Freddy",
    "email": "freddyMaguirsess@cloud8ine.com",
    "password": "$2b$10$M4oySX36.teWzNSVgwdkr.OOfXOJoHRxUfIJPCDCNB2SsgTFSZ50O",
    "role": "Doctor",
    "phoneNumber": "9988775115",
    "_id": "63f4d518637f09c0f550f323",
    "__v": 0
}

const authUser={
    "_id": "63aed50cf701f34a922e1bf3",
    "name": "Freddy",
    "email": "freddyMaguire@cloud9ine.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYWVkNTBjZjcwMWYzNGE5MjJlMWJmMyIsImlhdCI6MTY3Njk4OTc3OSwiZXhwIjoxNjc3MDc2MTc5fQ.s3qpG8t7pagCwVztsV2tHuYxG2deu-AQr_nAbRupYpE"
}

function registerFunction(){

return (
    registerUser
)

}

function authFunction(){

return(
    authUser
)

}

module.exports={registerFunction,authFunction}