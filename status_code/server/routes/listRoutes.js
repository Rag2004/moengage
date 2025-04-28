const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const List = require('../models/List');
const { generateMatchingCodes } = require('../utils/regexUtils');

// Save a list
router.post('/', authMiddleware, async (req, res) => {
  const { name, code } = req.body;
  
  try {
    
    const images = `https://http.dog/${code}.jpg`;
    const lists = await List.find({ userId: req.user.id , code: code});
    console.log(lists, 'lists')
    const newList = new List({
      userId: req.user.id,
      name,
      code,
      images,
    });

    await newList.save();
    res.json(newList);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all lists
router.get('/', authMiddleware, async (req, res) => {
  try {
    const lists = await List.find({ userId: req.user.id });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single list
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ msg: 'List not found' });
    if (list.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a list
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, responseCodes } = req.body;
  
  try {
    let list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ msg: 'List not found' });
    if (list.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    list.name = name || list.name;
    list.responseCodes = responseCodes || list.responseCodes;
    list.images = list.responseCodes.map(code => `https://http.dog/${code}.jpg`);
    
    await list.save();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a list
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) return res.status(404).json({ msg: 'List not found' });
    if (list.userId.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });

    await list.deleteOne();
    res.json({ msg: 'List removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
