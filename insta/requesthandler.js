
import userSchema from './model/user.js'
import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
const {sign}=pkg


export async function adduser(req,res) {
    console.log(req.body);
    const{username,email,pass,cpass}=req.body
    if(!(username&&email&&pass&&cpass))
        return res.status(500).send({msg:"empty"})
    if(pass!=cpass)
        return res.status(500).send({msg:"not match"})

    bcrypt.hash(pass,10).then((hpwd)=>{
console.log(hpwd);
console.log("data added");

userSchema.create({username,email,pass:hpwd}).then(()=>{
    res.status(201).send({msg:"success"})
})

    }).catch((error)=>{
        console.log(error);
        
    })

}

export async function login(req,res) {
    console.log(req.body);
    const{email,pass}=req.body

    if(!(email&&pass))
        return res.status(500).send({msg:"field are empty"})
    const user=await userSchema.findOne({email})
    if(!user)
        return res.status(500).send({msg:"user not exist"})
    const success= await bcrypt.compare(pass,user.pass)
    console.log(success);
    if(success !==true)
        return res.status(500).send({msg:"user or password not exist"})
    const token=await sign({UserID:user._id},process.env.JWT_KEY,{expiresIn:"24h"})
    res.status(200).send(token)
}