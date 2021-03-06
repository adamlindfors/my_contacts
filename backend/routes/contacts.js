const router = require("express").Router();
let User = require("../models/user.model");

//Get Contacts
router.route("/allContacts/").get((req, res) => {
  User.findOne({ tokenID: req.query.subID })
    .then((userData) => {
      if (userData) res.json(userData.contacts);
      else {
        const newUser = new User({ tokenID: req.query.subID });
        newUser.save().then(() => res.json([]));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Add contact
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const phoneNumber = req.body.phoneNumber;
  const favorite = false;
  const image = req.body.image;
  const work = req.body.work;
  const email = req.body.email;
  const birthday = req.body.birthday;
  const doorCode = req.body.doorCode;
  const relationship = req.body.relationship;
  const label = req.body.label;

  const newContact = {
    name,
    address,
    phoneNumber,
    favorite,
    image,
    work,
    email,
    birthday,
    doorCode,
    label,
    relationship,
  };

  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) user.contacts.push(newContact);
    user
      .save()
      .then(() => res.json("Contact updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//GET contact by ID
router.route("/contact/:id").get((req, res) => {
  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) {
      contact = user.contacts.filter((contact) => contact._id == req.params.id);
      res.json(contact[0]);
    }
  });
});

//Delete contact by ID
router.route("/deleteContact/:id").delete((req, res) => {
  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) {
      user.contacts = user.contacts.filter(
        (contact) => contact._id != req.params.id
      );

      user
        .save()
        .then(() => res.json("Contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

//Edit contact by ID
router.route("/update/:id").post((req, res) => {
  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) {
      contact = user.contacts.filter((contact) => contact._id == req.params.id);
      contact[0].name = req.body.name;
      contact[0].address = req.body.address;
      contact[0].phoneNumber = req.body.phoneNumber;
      contact[0].image = req.body.image;
      contact[0].work = req.body.work;
      contact[0].email = req.body.email;
      contact[0].birthday = req.body.birthday;
      contact[0].doorCode = req.body.doorCode;
      contact[0].relationship = req.body.relationship;
      contact[0].label = req.body.label;

      user
        .save()
        .then(() => res.json("Contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

//Toggle favorite contact
router.route("/togglefavorite/:id").post((req, res) => {
  User.findOne({ tokenID: req.body.subID }).then((user) => {
    if (user) {
      contact = user.contacts.filter((contact) => contact._id == req.params.id);
      contact[0].favorite = !contact[0].favorite;

      user
        .save()
        .then(() => res.json("Contact updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

//add User Image
router.route("/addUserImage").post((req, res) => {
  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) user.image = req.body.image;
    user
      .save()
      .then(() => res.json("Contact updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//get User Image
router.route("/getUserImage/").get((req, res) => {
  User.findOne({ tokenID: req.query.subID })
    .then((userData) => {
      if (userData.image) res.json(userData.image);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Add label
router.route("/addLabel").post((req, res) => {
  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) user.labels.push(req.body.label);
    user
      .save()
      .then(() => res.json("Contact updated!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

//Delete Label
router.route("/deletelabel").delete((req, res) => {
  User.findOne({ tokenID: req.query.subID }).then((user) => {
    if (user) {
      user.labels = user.labels.filter((label) => label !== req.query.label);

      user.contacts.forEach((contact) => {
        if (contact.label) {
          if (contact.label === req.query.label) {
            contact.label = "";
          }
        }
      });

      user
        .save()
        .then(() => res.json("Label deleted!"))
        .catch((err) => res.status(400).json("Error: " + err));
    }
  });
});

//Get all labels
router.route("/getLabels").get((req, res) => {
  User.findOne({ tokenID: req.query.subID })
    .then((userData) => {
      if (userData) res.json(userData.labels);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Export the router
module.exports = router;
