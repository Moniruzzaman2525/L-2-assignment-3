import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import config from './app/config';

let server: Server

async function main() {
  try {
   await mongoose.connect('mongodb+srv://admin-um:aMFu3p0gqtDzV8t1@cluster0.67neob1.mongodb.net/blog-server-l2-a3?retryWrites=true&w=majority&appName=Cluster0');
    server = app.listen(config.port, () => {
      console.log(`Example app listening: ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
