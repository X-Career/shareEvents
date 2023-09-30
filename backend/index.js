const express = require ('express');
const app = express();

const dotenv = require ('dotenv');
const helmet = require ('helmet');
const morgan = require ('morgan');
const cors = require('cors');
const { connectToDb } = require('./src/database/index.js');
const router = require('./src/routers/index.js');

dotenv.config();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors({
    origin: "*"
}));

connectToDb();
app.use(morgan("combined"));

app.use(router);

app.listen(process.env.PORT, () => {
    console.log("Server is listenning on http://localhost:" + process.env.PORT);
})





