const express = require('express');
const app = express();
const path = require('path');

const userModel  = require('./models/user');

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , "public")));


app.get('/' ,(req , res)=>{
    res.render("index");
});

app.get('/read', async (req, res) => {
    const users = await userModel.find();
    res.render("read", { users });
});

app.get('/delete/:id', async (req, res) => {
    const users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
});

app.get('/edit/:userid', async (req, res) => {
    const user = await userModel.findOne({_id: req.params.userid});
    res.render("edit" , { user });
});

app.post('/update/:userid', async (req, res) => {
    let {name , email , imageUrl} = req.body;
    const user = await userModel.findOneAndUpdate({_id: req.params.userid} ,{imageUrl , email, name} , {new : true});
    res.redirect("/read");
});



app.post('/create' ,async (req , res)=>{
    const {name , email , imageUrl} = req.body;
    const creatUser = await userModel.create({
        name ,
        email ,
        imageUrl
    })

    res.redirect('/read');
});

app.listen(3000);