import mongoose from "mongoose";

const mongodb_uri = process.env.MONGODB_URI
console.log(mongodb_uri)
if(!mongodb_uri){
  throw new Error("please define mongodb uri")
}

let cached = global.mongoose;
if(!cached){
  cached = global.mongoose = {
    connection: null,
    promise: null
  }
}

export async function connectionToDb() {
  if(cached.connection){
    return cached.connection
  }

  if(!cached.promise){
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10
    }
    mongoose.connect(mongodb_uri, opts).then(() => mongoose.connection)
  }

  try {
    cached.connection = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error 
  }
  return cached.connection
}