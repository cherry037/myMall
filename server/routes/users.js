var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var User = require('../models/user')

mongoose.connect('mongodb://127.0.0.1:27017/dumall', { useNewUrlParser: true })

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
})

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
})

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
})

Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next){
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000*60*60
        })
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000*60*60
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '账号密码错误',
          result: ''
        })
      }
    }
  })
})
router.post('/logout', function (req, res, next) {
  res.cookie("userId", "", {
    path: "/",
    maxAge: '-1'
  })
  res.json({
    status: "0",
    msg: "",
    result: ""
  })
})
router.get('/checkLogin', function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: "0",
      msg: "",
      result: req.cookies.userName || ""
    })
  } else {
    res.json({
      status: "1",
      msg: "未登陆",
      result: ""
    })
  }
})
router.get('/cartList', (req, res, next) => {
  const userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          cartList: doc.cartList
        }
      })
    }
  })
})
router.get('/cartCount', (req, res, next) => {
  const userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      const cartList = doc.cartList
      let cartCount = 0
      cartList.forEach(item => {
        cartCount += item.productNum
      })
      res.json({
        status: '0',
        msg: '',
        result: cartCount
      })
    }
  })
})
router.post('/editCart', (req, res, next) => {
  const userId = req.cookies.userId
  const checked = req.body.checked
  const productNum = req.body.productNum
  if (userId) {
    
  }
  const productId = req.body.productId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      const cartList = doc.cartList
      cartList.forEach(item => {
        if (item.productId === productId) {
          item.checked = checked
          item.productNum = productNum
        }
      })
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: '1',
            msg: err2.message,
            result: ''
          })
        } else {
          res.json(
            {
              status: '0',
              msg: '',
              result: 'suc'
            }
          )
        }
      })
    }
  })
})
router.post('/delCart', (req, res, next) => {
  const userId = req.cookies.userId
  const productId = req.body.productId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      const cartList = doc.cartList
      cartList.forEach((item, index) => {
        if (item.productId === productId) {
          cartList.splice(index, 1)          
        }
      })
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: '1',
            msg: err2.message,
            result: ''
          })
        } else {
          res.json(
            {
              status: '0',
              msg: '',
              result: 'suc'
            }
          )
        }
      })
    }
  })
})
router.get('/addressList', (req, res, next) => {
  const userId = req.cookies.userId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      const addressList = doc.addressList
      res.json({
        status: '0',
        msg: '',
        result: {addressList: addressList}
      })
    }
  })
})
router.post('/setDefault', (req, res, next) => {
  const userId = req.cookies.userId
  const addressId = req.body.addressId
  User.findOne({userId: userId}, (err, doc)=> {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      const addressList = doc.addressList
      addressList.forEach(item => {
        if (item.isDefault) {
          item.isDefault = false
        }
        if (item.addressId === addressId) {
          item.isDefault = true
        }
      })
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: 'suc'
          })
        }
      })
    }
  })
})
router.post('/delAdress', (req, res, next) => {
  const userId = req.cookies.userId
  const addressId = req.body.addressId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      const addressList = doc.addressList
      addressList.forEach((item, index) => {
        if (item.addressId === addressId) {
          addressList.splice(index, 1)
        }
      })
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: 'suc'
          })
        }
      })
    }
  })
})
router.post('/payment', (req, res, next) => {
  const userId = req.cookies.userId
  const orderTotal = req.body.orderTotal
  const addressId = req.body.addressId
  User.findOne({userId: userId}, (err, doc) => {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      let address = {}
      let goodsList = []
      doc.addressList.forEach(item => {
        if (item.addressId === addressId) {
          address = item
        }
      })
      doc.cartList.forEach(item => {
        if (item.checked === 1) {
          goodsList.push(item)
        }
      })
      var platform = '622'
      var r1 = Math.floor(Math.random()*10)
      var r2 = Math.floor(Math.random()*10)      
      
      var sysDate = new Date().Format('yyyMMddhhmmss')
      var createDate = new Date().Format('yyy-MM-dd hh:mm:ss')
      var orderId = platform + r1 + sysDate + r2
      var order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: 1,
        createDate: createDate
      }
      doc.orderList.push(order)
      doc.save((err2, doc2) => {
        if (err2) {
          res.json({
            status: '1',
            msg: err2.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        }
      })
    }
  })
})
module.exports = router;
