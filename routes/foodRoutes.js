import express from 'express';
import Food from '../models/food.js';

const router = express.Router();

const authenticate = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Please login first' });
  }
  next();
};

router.get('/', authenticate, async (req, res) => {
  try {
    const foods = await Food.find();
    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching foods' });
  }
});

router.post('/add', authenticate, async (req, res) => {
  const { foodName, calories, image } = req.body;

  try {
    const newFood = new Food({ foodName, calories, image });
    await newFood.save();
    res.status(201).json({ message: 'Food added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding food' });
  }
});

export default router;
