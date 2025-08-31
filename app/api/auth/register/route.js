import { connectionToDb } from "@/lib/db"
import User from "@/model/User"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"


export async function POST(request){

  try {
  const {email, password} = await request.json()

  if(!email || !password){
    return NextResponse.json(
      {error: "All the fields are required"},
      {status: 400}
    )
  }
  
  await connectionToDb();

    const existingUser = await User.findOne({email})
    if(existingUser){
      return NextResponse.json(
        {error: "User with same email exists"},
        {status: 400}
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      email,
      password
    })

    if(!user){
      return NextResponse.json(
        {error: "While registering something went wrong"},
        {status: 500}
      )
    }

    const userObj = user.toObject();
    delete userObj.password;

    return NextResponse.json(
      userObj,
      {status: 201}
    )
    
  } catch (error) {
    console.error("Registering error", error)
    return NextResponse.json(
      {error: "Failed to register user"},
      {status: 500}
    )
  }
}