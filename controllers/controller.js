const modelsmsg = require('../models/Model');

const bcrypt = require('bcrypt');
const saltRounds = 10;




const defaultController = async (req, res) => {

    if(req.cookies.UserId){

        const fName = req.cookies.FirstName;
        const lName = req.cookies.LastName;

        res.render('index',{
            fName : fName,
            lName : lName
        });
    }else{
    
        res.redirect('/login')

    }

}




// Sign Up Form Submission Process

const signupController = (req, res) => {
    res.render('signup');
}
const postSignupController = async (req, res) => {
    if (req.body.password === req.body.con_pass) {
        // console.log("hello",req.body);
        const hash = await bcrypt.hash(req.body.password, saltRounds)
        // Store hash in your password DB.
        console.log("bcrypt passsss", hash);

        const userData = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hash
        }
        const newData = new modelsmsg(userData)
        await newData.save();
        console.log("newDATA", newData);

        res.cookie('id', newData._id);
        res.redirect('/login');

    } else {
        console.log("could not found form data..");
    }
}





// Login Form Submit Process


const loginController = (req, res) => {
    res.render('login');
}


const PostLoginController = async (req, res) => {
    console.log("Login Pending..");
    
    const userLogin = await modelsmsg.find({
        email: req.body.email
    })
    console.log("userLOGIN", userLogin);
    

    if(userLogin){
        bcrypt.compare(req.body.password, userLogin[0].password,  async(err, result)=>{
            if (!err) {
                res.cookie("UserId",userLogin[0]._id.toString());
                res.cookie("FirstName",userLogin[0].fname);
                res.cookie("LastName",userLogin[0].lname);
                res.redirect('/');
            }
        })
    }else{
       res.redirect('/login');
    }
}


// profileController

const profileController = async (req,res) =>{

    const fname = await req.cookies.FirstName;
    const lname = await req.cookies.LastName;

    
        
            res.render('profile', {
                fname:fname,
                lname:lname
            });


}



module.exports = { defaultController, signupController, loginController, postSignupController, PostLoginController,profileController};
