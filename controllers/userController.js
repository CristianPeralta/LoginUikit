const formidable = require("formidable");
const fs = require("fs-extra");
const bcrypt = require("bcrypt");
const path = require("path");
var mongoose = require("mongoose");
const randomstring = require("randomstring");

var User = require('../models/User');


module.exports.login = function (req,res) {
  let data = req.body;
  console.log(data);
  User.findOne({email:data.email}).then((user, err) => {
    if(err){
      console.log(err);
      return res.sendStatus(503)
    }
    console.log(user);
    if ((user) && bcrypt.compareSync(data.password, user.password)) {
      User.findOne({_id:user._id}).then((user, err) => {
        if(err){
          console.log(err);
          return res.sendStatus(503)
        }
        req.session.user = user;
        let currentUser = req.session.user;
        return res.json(currentUser);
      })
    }

  })
}

module.exports.create = function (req,res) {
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    let data = fields;
        var user = new User();

        data.photo = path.join("uploads/", files.photo.name);
        console.log(data);

        user.name = data.name;
        user.email = data.email;
        user.photo = data.photo;
        user.password = bcrypt.hashSync(data.password, 10);

        user.save(function (err,user) {
            if(err){
              console.log(err);
              return res.sendStatus(503)
            }
            console.log(user)
            req.session.user = user;
            let currentUser = req.session.user;
            return res.json(currentUser);
        });

  });
  form.on("error", function(err) {
    return res.send(null, 500);
  });

  form.on("fileBegin", function(name, file) {
    let rdName = randomstring.generate();
    rdName = rdName.replace("/", "");
    let originalName = file.name;
    file.name = rdName + path.extname(originalName);
  });

  form.on("end", function(fields, files) {
    const temp_path = this.openedFiles[0].path;
    const file_name = this.openedFiles[0].name;
    const new_location = path.join(__dirname, "../public/uploads/", file_name);

    fs.copy(temp_path, new_location, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!")
      }
    });
  });
}

module.exports.getUser = function (req,res) {
    let user = req.session.user;
    if (!user) {
      return res.json({});
    } else {
      return res.json(user)
    }
}

module.exports.logout= function (req,res) {
    req.session.destroy(function(err) {
      if(err){
        console.log(err);
        return res.sendStatus(503)
      }
      return res.sendStatus(200);
    })
}
