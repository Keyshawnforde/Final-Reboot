var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let workout = require('../models/workout');

module.exports.DislayWorkoutSplit = async (req,res,next)=>{ //< Mark function as async
    try{
       const workoutSplit = await workout.find(); //< Use of await keyword
       res.render('workout/split', {
          title: 'Workout Split', 
          workoutSplit: workoutSplit,
          displayName: req.user ? req.user.displayName:''
       });
    }catch(err){
       console.error(err);
       //Handle error
       res.render('workout/split', {
          error: 'Error on server'
       });
    }
 };

 module.exports.AddWorkout = async (req,res,next)=>{
    try{
        res.render('workout/add',
        {
            title:'Add a Workout',
            displayName: req.user ? req.user.displayName:''
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('workout/add',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.ProcessWorkout = async (req,res,next)=>{
    try{
        let newWorkout = workout({
            "Workout":req.body.Workout,
            "Reps": req.body.Reps,
            "Sets": req.body.Sets,
            "Weight": req.body.Weight
            
        });
        workout.create(newWorkout).then(() =>{
            res.redirect('/workouts')
        })
    }
    catch(error){
        console.error(err);
        res.render('workout/split',
        {
            error: 'Error on the server'
        });
    }
};

module.exports.EditWorkout = async (req,res,next)=>{
    try{
    const id = req.params.id;
    const workoutToEdit = await workout.findById(id);
    res.render('workout/edit',
    {
        title:'Edit Your Workout',
        workout:workoutToEdit,
        displayName: req.user ? req.user.displayName:''
    })
}
catch(error){
    console.error(err);
    res.render('workout/split',
    {
        error: 'Error on the server'
    });
}
}

module.exports.ProcessEditWorkout = (req,res,next)=>{
    try{
        const id = req.params.id;
        let updatedWorkout = workout({
            "_id":id,
            "Workout":req.body.Workout,
            "Reps": req.body.Reps,
            "Sets": req.body.Sets,
            "Weight": req.body.Weight
            
        });
        workout.findByIdAndUpdate(id,updatedWorkout).then(()=>{
            res.redirect('/workouts')
        });
    }
    catch(error){
        console.error(err);
        res.render('workout/split',
        {
            error: 'Error on the server'
        });
    }
}



module.exports.DeleteWorkout = (req,res,next)=>{
    try{
        let id = req.params.id;
        workout.deleteOne({_id:id}).then(() =>
        {
            res.redirect('/workouts')
        })
    }
    catch(error){
        console.error(err);
        res.render('workout/split',
        {
            error: 'Error on the server'
        });
    }
}