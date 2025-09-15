require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/', (req,res)=> res.send({ok:true, message:'Sistema Atendimento API'}));

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
