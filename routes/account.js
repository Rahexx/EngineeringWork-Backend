var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Fault = require('../models/faults');
const Room = require('../models/room');
const Settlement = require('../models/settlement');
const Agreement = require('../models/agreement');

router.all('*', (req, res, next) => {
  if (!req.session.role) {
    res.redirect('/logIn');

    return;
  }

  next();
});

router.get('/', function (req, res) {
  const findUser = User.findOne({
    _id: req.session.id,
  });

  findUser.exec((err, data) => {
    const newDate = new Date(data.date);
    const formatDate = newDate.toLocaleDateString('en-US');
    res.render('account', { data, formatDate });
  });
});

router.get('/fault', function (req, res) {
  const { page = 1, limit = 3 } = req.query;

  const findRoom = Room.find({
    $or: [{ tenantId: req.session.id }, { ownerId: req.session.id }],
  });

  findRoom.exec((err, data) => {
    if (data.length > 0) {
      const roomIds = [];

      data.forEach((item) => {
        roomIds.push(item._id);
      });

      const findFault = Fault.find({
        roomId: { $in: roomIds },
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      findFault.exec(async (err, data) => {
        const count = await Fault.countDocuments({
          roomId: { $in: roomIds },
        });

        res.json({ data, totalPages: Math.ceil(count / limit) });
      });
    } else {
      res.json(data);
    }
  });
});

router.post('/fault/:id', function (req, res) {
  const findFault = Fault.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { status: req.body.status } },
    (err, data) => {
      if (err) {
        console.log('Sth wrong');
      }
    },
  );
});

router.post('/addFault/', function (req, res) {
  const findUser = User.findOne({
    login: req.body.login,
  });

  findUser.exec((err, data) => {
    const idUser = data._id;
    const findRoom = Room.findOne({
      $and: [
        { tenantId: { $in: [req.session.id, idUser] } },
        { ownerId: { $in: [req.session.id, idUser] } },
      ],
    });

    findRoom.exec((err, data) => {
      const searchRoomId = data._id;
      const newFault = new Fault({
        roomId: searchRoomId,
        description: req.body.description,
      });

      newFault.save();
    });
  });
});

router.get('/settlement', function (req, res) {
  const { page = 1, limit = 3 } = req.query;

  const findSettlement = Settlement.find({
    $or: [
      { tenantLogin: req.session.login },
      { ownerLogin: req.session.login },
    ],
  })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  findSettlement.exec(async (err, data) => {
    const count = await Settlement.countDocuments({
      $or: [
        { tenantLogin: req.session.login },
        { ownerLogin: req.session.login },
      ],
    });

    res.json({ data, totalPages: Math.ceil(count / limit) });
  });
});

router.get('/settlement/delete/:id', function (req, res) {
  const idSettlement = req.params.id;

  const findSettlement = Settlement.findByIdAndDelete(idSettlement, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

router.post('/addSettlement/', (req, res) => {
  const newSettlement = new Settlement({
    price: req.body.cost,
    date: req.body.date,
    tenantLogin: req.body.login,
    ownerLogin: req.session.login,
  });

  newSettlement.save();
});

router.get('/agreement', (req, res) => {
  const { page = 1, limit = 3 } = req.query;

  const findAgreement = Agreement.find({
    $or: [
      { tenantLogin: req.session.login },
      { ownerLogin: req.session.login },
    ],
  })
    .limit(limit * 1)
    .skip((page - 1) * limit);

  findAgreement.exec(async (err, data) => {
    const count = await Agreement.countDocuments({
      $or: [
        { tenantLogin: req.session.login },
        { ownerLogin: req.session.login },
      ],
    });

    res.json({ data, totalPages: Math.ceil(count / limit) });
  });
});

router.post('/addAgreement', (req, res) => {
  if (req.files) {
    const file = req.files.file;
    const indexDot = file.name.indexOf('.');
    const name = file.name.slice(0, indexDot);
    const extendFile = file.name.slice(indexDot, file.name.length);
    const randomId = Math.floor(Math.random() * (1000000 - 10) + 10);
    const fileName = `${req.body.name}.${randomId}${extendFile}`;
    const url = `${__dirname}/../public/agreements/${fileName}`;

    file.mv(url, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newAgreement = new Agreement({
          tenantLogin: req.body.login,
          ownerLogin: req.session.login,
          pathFile: `/agreements/${fileName}`,
        });

        newAgreement.save();
        res.redirect('/account');
      }
    });
  }
});

router.get('/rooms', (req, res) => {
  const findRoom = Room.find({
    $or: [{ tenantId: req.session.id }, { ownerId: req.session.id }],
  });

  findRoom.exec((err, data) => {
    const currentUser = req.session.id;

    res.json({
      data,
      currentUser,
    });
  });
});

router.get('/addUser/:login/:id', (req, res) => {
  const findUser = User.findOne({
    login: req.params.login,
  });

  findUser.exec((err, data) => {
    const findRoom = Room.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: { tenantId: data._id } },
      (err, data) => {
        if (err) {
          console.log('Sth wrong');
          res.json({ isDone: false });
        }
        res.json({ isDone: true });
      },
    );
  });
});

router.get('/removeUser/:id', (req, res) => {
  const findRoom = Room.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $set: { tenantId: '' } },
    (err, data) => {
      if (err) {
        console.log('Sth wrong');
        res.json({ isDone: false });
      }
      res.json({ isDone: true });
    },
  );
});

router.post('/addRoom', (req, res) => {
  if (req.files) {
    const file = req.files.file;
    const indexDot = file.name.indexOf('.');
    const extendFile = file.name.slice(indexDot, file.name.length);
    const randomId = Math.floor(Math.random() * (1000000 - 10) + 10);
    const fileName = `room.${randomId}${extendFile}`;
    const url = `${__dirname}/../public/images/${fileName}`;

    file.mv(url, (err) => {
      if (err) {
        console.log(err);
      } else {
        const newRoom = new Room({
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          pathImage: `/images/${fileName}`,
          location: req.body.location,
          ownerId: req.session.id,
        });
        newRoom.save();
        res.redirect('/account');
      }
    });
  }
});

module.exports = router;
