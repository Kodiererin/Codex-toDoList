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
mongoose.set('strictQuery', false);

const itemsSchema = mongoose.Schema({
    name : {
        type : String,
        uppercase : true,
    }
});

const Item = new mongoose.model('Item',itemsSchema);

const item1 = new Item({
    name : "Welcome to the toDo List"
})

const item2 = new Item({
    name : "Hit the + button to add a New Item"
})

const item3 = new Item({
    name : "<-- Hit this to delete an Item."
})

const defaultItems = [item1 , item2 , item3];

const listSchema = {
    name : String,
    items : [itemsSchema],
};

const List = new mongoose.model("List" , listSchema);

const itemsModel = mongoose.model('itemsModel',itemsSchema); 
// Ise Mt Dekhna Ye By Default List h------------------------>
app.get('/', async function(req,res){
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
        // console.log(err)
        console.log('Error Found '+err);
})

// customId is the ID which I am getting the Parameter.

app.get('/:customId' ,async function(req,res){
    const customId = req.params.customId;
    console.log("Jumped Here");
    List.findOne({ name: customId }, await function (err, found) {
        if (!err) {
            if (!found) {
                console.log("Not Found");
                const list = new List({
                    name : customId,
                    items : defaultItems,
                });
                list.save();
                res.redirect("/"+customId)
            } else {
                console.log(found);

                res.render("list",{agenda : found.name , listItem : found.items})
            }
        } else {
            console.log(err);

        }
    })
    
});

app.post('/',async function (req,res){
    console.log(req.body);
    const itemName = req.body.newItem;
    const listValue = req.body.list;
    
    console.log(itemName);
    console.log(listValue);
  
    const item = new Item({
        name: itemName
      });
    
    if(listValue === 'Today')
    {   
        item.save();
        res.redirect('/');
    }
    else{
        console.log("The Data is Getting Entered Here");
        List.findOne({name : listValue } , function(err,foundList){
            foundList.items.push(item);
            console.log(foundList);
            foundList.save();
            res.redirect('/'+listValue);
        })
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

