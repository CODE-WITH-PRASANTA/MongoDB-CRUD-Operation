import user from '../model/userModel.js'

export const create = async(req , res)=>{
    try {
        const userdata = new user(req.body);
        const {email} = userdata ;
        
        const userExist = await user.findOne({ email });

        if (userExist) {
            return res.status(400).json({message : "user already exist"})
        }
        const savedUser = await userdata.save();
        res.status(200).json(savedUser);


    } catch (error) {
        res.status(500).json({error:"Internal error found"})
    }
}


export const fetch = async(req , res)=>{
    try {
        const users = await user.find();
        if (users.length ===0) {
            return  res.status(404).json({message: "Users Data Not Found"})
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error:"Internal error found"})
    }
}


export const update = async(req , res)=>{
        try {
            const id = req.params.id;
            const userExist = await user.findOne({ _id: id });
            if (!userExist) {
                return res.status(404).json({message :  "User not found"})      
            }
            const updateUser = await user.findByIdAndUpdate(id , req.body , {new : true})
            res.status(201).json(updateUser);
        } catch (error) {
            res.status(500).json({error:"Internal error found"})
        }
}

export const deleteUser = async(req , res)=>{
        try {
            const id = req.params.id;
            const userExist = await user.findOne({ _id: id });
            if (!userExist) {
                return res.status(404).json({message :  "User not found"})      
            }  
            await user.findByIdAndDelete(id);
            res.status(201).json({message : "Deleted the data successfully"});
        } catch (error) {
            res.status(500).json({error:"Internal error found"})
        }
}