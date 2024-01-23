// studentRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

// POST to add a new student
router.post('/', async (req, res) => {
  try {
    // Extract data from the request body
    const { firstName, lastName, dateOfBirth } = req.body;

    // Create a new student document
    const newStudent = new Student({
      firstName,
      lastName,
      dateOfBirth,
    });

    // Save the new student to the database
    await newStudent.save();

    res.status(201).json(newStudent); // Respond with the created student
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.delete('/delete', async (req, res) => {
    try {
      // Extract the IDs of the selected students to delete
      const { studentIds } = req.body;
  
      // Perform the deletion based on the student IDs
      await Student.deleteMany({ _id: { $in: studentIds } }).exec();
  
      res.status(200).json({ message: 'Selected students deleted successfully' });
    } catch (error) {
      console.error('Error deleting students:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

module.exports = router;
