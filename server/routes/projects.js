const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/projects
// @desc    Create a project (Admin)
// @access  Private (Mocking basic auth for now)
router.post('/', async (req, res) => {
  const { title, description, image, category, tags, github, demo, detailedContent } = req.body;

  try {
    const newProject = new Project({
      title,
      description,
      image,
      category,
      tags,
      github,
      demo,
      detailedContent,
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
