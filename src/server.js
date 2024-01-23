const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models/database");
const studentRoutes = require("./routes/studentRoutes");
const coursesRoutes = require("./routes/courseRoutes");

require('dotenv').config()

const PORT = process.env.PORT || 5000;
const uri = process.env.DB_URI;

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true })); // parse requests application/x-www-form-urlencoded

app.use('/api/students', studentRoutes);
app.use('/api/courses', coursesRoutes);

db.mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch((error) => {
    console.log("Unable to connect to database");
    console.log(error);
});
