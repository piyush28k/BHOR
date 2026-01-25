import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/user.route.js';
import profileRoute from './routes/profile.route.js';
import uploadRoute from './routes/upload.route.js';
import chatRoute from './routes/chat.route.js'
import postRoute from './routes/post.routes.js'

import http from 'http'
import { Server } from 'socket.io';
import socketIo from './middleware/socketIo.js';

const app = express();
const server = http.createServer(app)

app.use(express.json());
app.use(
  cors({
    origin: [`${process.env.CLIENT_URL}`],
    credentials: true,
  })
);

const io = new Server(server,{
  cors :{
    origin: [`${process.env.CLIENT_URL}`],
    credentials : true
  }
})

socketIo(io)

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.DATABASE_URL

try{
    mongoose.connect(MONGO_URL)
    console.log("connected to MongoDB successfully");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}

app.use('/user', userRoute);
app.use('/profile', profileRoute);
app.use('/api', uploadRoute);
app.use('/chat', chatRoute);
app.use('/post', postRoute);

server.listen(PORT,'0.0.0.0',()=>{
    console.log('running on port', PORT);
})