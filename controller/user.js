const db = require('../model/user')
const jwt=require('jsonwebtoken')
const{generateAccessToken}=require('../Auth/jwt')
const bcrypt=require('bcrypt')

exports.getUser = async (req, res) => {

    try {
        const allUser = await db.find({Email:req.body.Email},
            { Email: 1,
                First_Name:1,
                Middle_Name:1,
                Last_Name:1,
                Department:1,
                Role:1})
        res.status(200).send({ message: allUser })
        console.log(allUser);
    }
    catch (er) {
        console.log(er);
    }
}

exports.loginUser=async (req,res)=>{
    try {
        const data=await db.find({Email:req.body.Email})
        console.log(data[0].Email.length);
        if(data[0].Email){
            // console.log(data[0]);
            if(data[0].Email===req.body.Email){
                if(bcrypt.compareSync(req.body.Password,data[0].Password)){
                    const token=generateAccessToken({Email:req.body.Email})
                    res.cookie("token",token).status(200).send({message:"login successfully "})
                    
                }else{
                    res.status(404).send({message:"incorrect Password"})
                }
               
            }else{
                res.status(404).send({message:"incorrect Email..."})
            }
        }else{
            res.send("not valid")
        }
    } catch (error) {
        console.log(error);
    }
}

exports.createUser = async (req, res) => {
    try {
        const userData = {
            First_Name: req.body.First_Name,
            Middle_Name: req.body.Middle_Name,
            Last_Name: req.body.Last_Name,
            Email: req.body.Email,
            Password: bcrypt.hashSync(req.body.Password,10),
            Role: req.body.role,
            Department: req.body.Department
        }
        await db.insertMany(userData)
            .then((result) => {
                res.status(200).send({ message: result })

            }).catch((err) => {
                res.status(500).send({ message: err.message })
            });

    }
    catch (er) {
        console.log(er);
        res.send(er.message)
    }
};




exports.updateUser = async (req, res) => {
    try {
        const userData = {
            First_Name: req.body.First_Name,
            Middle_Name: req.body.Middle_Name,
            Last_Name: req.body.Last_Name,
            Email: req.body.Emai,
            Role: req.body.role,
            Department: req.body.Department,
            
        }
        await db.updateMany({
            First_Name: req.body.First_Name,
            $set: userData
        })
            .then((result) => {
                res.status(200).send({ message: result })

            }).catch((err) => {
                res.status(500).send({ message: err.message })
            });

    }
    catch (er) {
        console.log(er);
        res.send(er.message)
    }
};

