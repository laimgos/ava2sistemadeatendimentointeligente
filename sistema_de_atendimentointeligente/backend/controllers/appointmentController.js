const Appointment = require('../models/Appointment');
const axios = require('axios');

exports.list = async (req,res)=>{
  const { start, end } = req.query;
  const filter = {};
  if(start && end) filter.date = { $gte: new Date(start), $lte: new Date(end) };
  const items = await Appointment.find(filter).populate('patientId','name email');
  res.json(items);
};

exports.create = async (req,res)=>{
  try{
    const { patientId, doctorName, date, durationMinutes, address } = req.body;
    const dt = new Date(date);
    // check conflict
    const start = dt;
    const end = new Date(dt.getTime() + (durationMinutes||30)*60000);
    const conflict = await Appointment.findOne({
      date: { $lt: end, $gte: new Date(start.getTime() - 24*60*60*1000) }
    });
    if(conflict) return res.status(409).json({message:'Time conflict'});
    // check weather (simple example using OpenWeather)
    let weatherAlert = false;
    try{
      if(process.env.OPENWEATHER_KEY && address && address.city){
        const q = encodeURIComponent(address.city);
        const resw = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${q}&appid=${process.env.OPENWEATHER_KEY}`);
        // naive check: if any forecast for date has rain
        const targetDay = dt.toISOString().slice(0,10);
        const hasRain = resw.data.list.some(item => item.dt_txt.startsWith(targetDay) && (item.weather.some(w=>/rain/i.test(w.main)) || item.rain));
        weatherAlert = !!hasRain;
      }
    }catch(e){
      console.warn('Weather lookup failed', e.message);
    }
    const ap = await Appointment.create({ patientId, doctorName, date:dt, durationMinutes, address, weatherAlert });
    res.status(201).json(ap);
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
};

exports.getById = async (req,res)=>{
  const ap = await Appointment.findById(req.params.id).populate('patientId','name email');
  if(!ap) return res.status(404).json({message:'Not found'});
  res.json(ap);
};

exports.update = async (req,res)=>{
  const ap = await Appointment.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(ap);
};

exports.remove = async (req,res)=>{
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ok:true});
};
