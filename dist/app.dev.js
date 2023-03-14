"use strict";

//      Happy Chhat Puja
var express = require("express");

var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express["static"]("public"));
app.set('view engine', 'ejs'); //EJS
// Mongoose Instialisation
// getting-started.js

var mongoose = require('mongoose');

main()["catch"](function (err) {
  return console.log(err);
});

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect('mongodb://127.0.0.1:27017/toDoDB', {
            useNewUrlParser: true
          }));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

mongoose.set('strictQuery', false);
var itemsSchema = mongoose.Schema({
  name: {
    type: String,
    uppercase: true
  }
});
var Item = new mongoose.model('Item', itemsSchema);
var item1 = new Item({
  name: "Welcome to the toDo List"
});
var item2 = new Item({
  name: "Hit the + button to add a New Item"
});
var item3 = new Item({
  name: "<-- Hit this to delete an Item."
});
var defaultItems = [item1, item2, item3];
var listSchema = {
  name: {
    type: String,
    uppercase: true
  },
  items: [itemsSchema]
};
var List = new mongoose.model("List", listSchema);
var itemsModel = new mongoose.model('itemsModel', itemsSchema); // Ise Mt Dekhna Ye By Default List h------------------------>

app.get('/', function _callee(req, res) {
  var listItem, agenda;
  return regeneratorRuntime.async(function _callee$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(itemsModel.find());

        case 2:
          listItem = _context2.sent;
          // Async and await is important.
          console.log(listItem);
          agenda = "Today";
          console.log(listItem.length);

          if (listItem.length == 0) {
            listItem.push({
              name: "Please Add Some Work"
            });
            res.render('list', {
              agenda: agenda,
              listItem: listItem
            });
          } else {
            res.render('list', {
              agenda: agenda,
              listItem: listItem
            });
          } // console.log(err)
          // console.log('Error Found '+err);


        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // customId is the ID which I am getting the Parameter.

app.get('/:customId', function _callee2(req, res) {
  var customId;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          customId = req.params.customId;
          console.log("Jumped Here");
          _context3.t0 = List;
          _context3.t1 = {
            name: customId
          };
          _context3.next = 6;
          return regeneratorRuntime.awrap(function (err, found) {
            if (!err) {
              if (!found) {
                console.log("Not Found");
                var list = new List({
                  name: customId,
                  items: defaultItems
                });
                list.save();
                res.redirect("/" + customId);
              } else {
                console.log(found);
                res.render("list", {
                  agenda: found.name,
                  listItem: found.items
                });
              }
            } else {
              console.log(err);
            }
          });

        case 6:
          _context3.t2 = _context3.sent;

          _context3.t0.findOne.call(_context3.t0, _context3.t1, _context3.t2);

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post('/', function _callee3(req, res) {
  var itemName, listValue, item, myTask, p, listItem, agenda;
  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(req.body);
          itemName = req.body.newItem;
          listValue = req.body.list;
          console.log(itemName);
          console.log(listValue);
          item = new Item({
            name: itemName
          }); // const itemsModel = new itemsModel({
          //     name : itemName,
          // })

          if (!(listValue === 'Today')) {
            _context4.next = 18;
            break;
          }

          // itemsModel.save();
          // res.redirect('/');
          console.log(req.body);
          myTask = req.body.newItem + "";
          p = new itemsModel({
            name: req.body.newItem
          });

          if (myTask.length > 0) {
            p.save(function (err) {
              if (err) {
                console.log(err);
              }
            });
          }

          _context4.next = 13;
          return regeneratorRuntime.awrap(itemsModel.find());

        case 13:
          listItem = _context4.sent;
          // Async and await is important.
          agenda = "Today";

          if (listItem.length == 0) {
            res.render('list', {
              agenda: agenda,
              listItem: ["Please Add An Item"]
            });
          } else {
            res.render('list', {
              agenda: agenda,
              listItem: listItem
            });
          }

          _context4.next = 20;
          break;

        case 18:
          console.log("The Data is Getting Entered Here");
          List.findOne({
            name: listValue
          }, function (err, foundList) {
            foundList.items.push(item);
            console.log(foundList);
            foundList.save();
            res.redirect('/' + listValue);
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.post('/delete', function _callee4(req, res) {
  var checkedItemId, listName, data, listItem, agenda;
  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          checkedItemId = req.body.check;
          console.log(checkedItemId);
          listName = req.body.listName;
          console.log(listName);

          if (!(listName == 'Today')) {
            _context5.next = 21;
            break;
          }

          console.log('Deleting the Task');
          data = req.body.check;
          itemsModel.findByIdAndDelete(data, function (req, res) {
            console.log("Deleted");
          });
          _context5.prev = 8;
          _context5.next = 11;
          return regeneratorRuntime.awrap(itemsModel.find());

        case 11:
          listItem = _context5.sent;
          // Async and await is important.
          agenda = "Today";

          if (listItem.length == 0) {
            listItem.push({
              name: "Please Add Some Work"
            });
            res.render('list', {
              agenda: agenda,
              listItem: listItem
            });
          } else {
            res.render('list', {
              agenda: agenda,
              listItem: listItem
            });
          }

          _context5.next = 19;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](8);
          // console.log(err)
          console.log('Error Found ' + _context5.t0);

        case 19:
          _context5.next = 22;
          break;

        case 21:
          List.findOneAndUpdate({
            name: listName
          }, {
            $pull: {
              items: {
                _id: checkedItemId
              }
            }
          }, function (err, foundList) {
            if (!err) {
              res.redirect('/' + listName);
            }
          });

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[8, 16]]);
});
app.listen(3000, function () {
  console.log("Server Has Started On Port 3000");
});