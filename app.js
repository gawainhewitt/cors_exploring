const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({
  origin: 'https://www.emileholba.co.uk'
}));

app.get('/', (req, res) => {
  res.send("Hello");
});

app.listen(process.env.port || 3000);
console.log('Web server is listening at port' + (process.env.port || 3000));

