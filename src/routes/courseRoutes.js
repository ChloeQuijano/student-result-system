const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/', async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

// POST to add a new course
router.post('/', async (req, res) => {
  try {
    // Extract data from the request body
    const { courseName } = req.body;

    // Create a new course
    const newCourse = new Course({
      courseName,
    });

    // save new course
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;