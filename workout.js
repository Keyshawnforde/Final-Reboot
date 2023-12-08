var express = require('express');
var router = express.Router();
//const { router } = require('../config/app');
let workout = require('../models/workout');
let workoutController = require('../controllers/workout_split')

function requireAuth(req,res,next){
    if(!req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}

// Read Operation
router.get('/', workoutController.DislayWorkoutSplit);

router.get('/add', requireAuth, workoutController.AddWorkout); 

router.post('/add', requireAuth, workoutController.ProcessWorkout);

router.get('/edit/:id', requireAuth, workoutController.EditWorkout);

router.post('/edit/:id', requireAuth, workoutController.ProcessEditWorkout);

router.get('/delete/:id', requireAuth, workoutController.DeleteWorkout);
 module.exports = router;