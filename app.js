const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const _ = require("lodash");
const app = express();
const homeStartingContent = "This is PARA 1. Regardless of the industry you work in, chances are you deal with PDFs. While PDFs are exceedingly practical for their small file size and standardized formatting, it can be a huge pain when you realize one minor detail was incorrect. Suddenly, you have to run down the original file (which might not be on your computer), make the adjustment, re-save, and redistribute the correct copy to everyone. Or, if you have PDF Expert, you can fix the document on the fly.";
const aboutContent = "This website provides users with DAILY JOURNAL articles. The authors can share their ideas without facing any biases.";
const contactContent = "The owner of DAILY JOURNAL is Arpit Kushwaha. Email : arpitkushwah01@gmail.com";
var posts = [];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine",'ejs');
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res)
{
    res.render("home",{homeStartingContent:homeStartingContent , posts:posts});
});

app.get("/about",function(req,res)
{
    res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",function(req,res)
{
    res.render("contact",{contactContent:contactContent});
});

app.get("/compose",function(req,res)
{
    res.render("compose");
});

app.post("/compose",function(req,res)
{
    var post = {
        postTitle : req.body.postTitle,
        postBody : req.body.postBody
    };

    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName",function(req,res)
{
    posts.forEach(function(post){
        if(_.lowerCase(req.params.postName)===_.lowerCase(post.postTitle))
            {
                res.render("post",{postTitle : post.postTitle , postBody : post.postBody});
            }
    });
});

// app.post("/",function(req,res)
// {
//     res.redirect("/");    
// });

app.listen(3000,function(req,res)
{
    console.log("Server started at port 3000.");
});

