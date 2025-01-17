import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  foodName: { type: String, required: true, unique: true},
  category:{type:String},
  calories: { type: Number, required: true },
  image: { type: String, default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjJSVVvm6XoCoc5SGjZwBjZOn-M3yEvMdDRw&s" }
});

export default mongoose.model('Food', foodSchema);
