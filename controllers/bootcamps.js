// Importing the Bootcamp database
const Bootcamp = require('../models/Bootcamps');


exports.getBootCamps = async (req, res, next)=>{
  const bootcamps = await Bootcamp.find({})
    res.status(200).json({
        success: true,
        data: bootcamps.reverse()
    })
}

exports.createBootCamps = async (req, res, next)=>{

  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp
  })

}

exports.getSingleBootcamp = async (req, res, next)=>{
  const bootcamp = await Bootcamp.findById(req.params.id);

  res.status(200).json({
    sucess: true,
    data: bootcamp
  })
}

exports.deleteBootcamp = async (req, res, next) =>{
    const deleteBotcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    res.status(200).json({
        sucess: true,
        data: deleteBotcamp
    })
}

exports.updateBootcamp = async (req, res, next)=>{
    const updateBootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body , {new: true})

    // console.log(updateBootcamp);
    
    res.status(201).json({
        sucess: true,
        data: updateBootcamp
    })
    
}
