const swaggerAutogen = require('swagger-autogen')();
const doc={
    info:{
        title:'test',
        description:"test"
    },
    host:"localhost:8080"
};

const outputfile ="./swagger-output.json";
const routes =["./routes/auth.routes.js"];

swaggerAutogen(outputfile,routes,doc);