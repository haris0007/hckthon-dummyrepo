import express from 'express';
import mongoose  from 'mongoose';
import fs from 'fs';
import Food from "./models/food.js";
import foodRoutes from "./routes/foodRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import session from 'express-session';

const app =express();
app.use(express.json());

app.use(
  session({
    secret: 'simple-secret', 
    resave: false,
    saveUninitialized: true,
  })
);


const datainsert= async ()=>{
try{
    await mongoose.connect("mongodb://127.0.0.1:27017/3335")

    const data = fs.readFileSync("db.json",'utf-8');
    const cData = JSON.parse(data);

    await Food.insertMany(cData.foods);
    console.log("Database seeded with data");
}catch{
    console.log("Error seeding data",error.message);
}
};

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

app.get('/foods', async (req, res) => {
    try {
      const foods = await Food.find(); 
      res.json(foods);  
    } catch (err) {
      console.error('Error fetching foods:', err);
      res.status(500).send('Server Error');
    }
  });


app.listen(3000,async ()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/3335");
        console.log("Database connected succesfully");
        await datainsert();
    }catch(err){
        console.log("Error connecting to the database",err.message);
    }
    console.log("Server is running...")
})
