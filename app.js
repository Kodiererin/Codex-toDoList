//      Happy Chhat Puja

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine','ejs');               //EJS

// Mongoose Instialisation
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/toDoList',{useNewUrlParser : true});  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
mongoose.set('strictQuery', true);

const itemsSchema = mongoose.Schema({
    name : {
        type : String,
        uppercase : true,
    }
});

const itemsModel = mongoose.model('itemsModel',itemsSchema);
// Ise Mt Dekhna Ye By Default List h------------------------>
app.get('/', async function(req,res){
    try{
        const listItem = await itemsModel.find();       // Async and await is important.
        console.log(listItem)
        let agenda = "Today";
        console.log(listItem.length);
        if(listItem.length==0){
            listItem.push({name : "Please Add Some Work"});
            res.render('list',{agenda,listItem});
        }
        else{
         res.render('list',{agenda,listItem});
       }
    }catch(err){
        // console.log(err)
        console.log('Error Found '+err);
    }
})

app.post('/',async function (req,res){
    console.log(req.body);
    let myTask = req.body.newItem+"";
    let p = new itemsModel({
        name : req.body.newItem
    })
   if(myTask.length>0){
    p.save(function(err){
        if(err){
            console.log(err);
        }
    })
   }
    const listItem = await itemsModel.find();       // Async and await is important.
            let agenda = "Today";
            if(listItem.length==0){
                res.render('list',{agenda,listItem:["Please Add An Item"]});
            }
            else{
             res.render('list',{agenda,listItem});
           }
    });
app.post('/delete',async function(req,res){
  console.log('Deleting the Task'); 
  const data = req.body.check;
    itemsModel.findByIdAndDelete(data,function(req,res){
        console.log("Deleted")
    });
    try{
        const listItem = await itemsModel.find();       // Async and await is important.
        let agenda = "Today";
        if(listItem.length==0){
            listItem.push({name : "Please Add Some Work"});
            res.render('list',{agenda,listItem});
        }
        else{
         res.render('list',{agenda,listItem});
       }
        
    }catch(err){
        // console.log(err)
        console.log('Error Found '+err);
    }
})

app.listen(3000,function()
{
    console.log("Server Has Started On Port 3000");
})

