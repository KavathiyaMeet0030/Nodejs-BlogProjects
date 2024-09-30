const modelsmsg = require('../models/Model');

const bcrypt = require('bcrypt');
const saltRounds = 10;




const defaultController = async (req, res) => {


        res.render('index');
           
}




// Sign Up Form Submission Process

const signupController = (req, res) => {
    if(req.isAuthenticated()){

        res.redirect('/')
      }
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
     if(req.isAuthenticated()){

      res.redirect('/')
    }
    res.render('login');
}


const PostLoginController =  async(req, res) => {
    console.log("Login Pending..");
     
       res.redirect('/');
}

const logoutController = (req,res)=>{

    console.log("Logout");
    req.logout((err)=>{
        if(err){
            next()
        }

        res.redirect('/login')
    })

}

//addblog 

const addblogController = (req,res) =>{
    console.log("AddBlog Render");

    res.render('addblog');

}





module.exports = { defaultController, signupController, loginController, postSignupController, PostLoginController,logoutController,addblogController};
