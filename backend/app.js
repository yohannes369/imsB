import express from 'express';
//import Db fuction
import Db from './config/db.js';
const app = express();

app.use(express.json());
// code routes register employee
app.get('api/employees/register', (req, res) => {
  res.send('Register Employee');
});

app.post('/', (req, res) => {
  res.send('Hello World');
});

//use env port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});