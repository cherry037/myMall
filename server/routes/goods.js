var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

router.get('/list', (req, res, next) => {
    let {pageIndex, pageSize, sort, priceLevel} = req.query
    pageIndex = parseInt(pageIndex)
    pageSize = parseInt(pageSize)
    const skip = (pageIndex - 1) * pageSize
    let priceGt = ''
    let priceLte = ''
    let params = {}
    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0': 
                priceGt = 0
                priceLte = 100
                break;
            case '1': 
                priceGt = 100
                priceLte = 500
                break;
            case '2': 
                priceGt = 500
                priceLte = 1000
                break;
            case '3': 
                priceGt = 1000
                priceLte = 5000
                break;
            default:
                priceGt: ''
                priceLte: ''
                break;
        }
        params = {
            salePrice: {
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
    goodsModel.sort({'salePrice': sort})
    goodsModel.exec((err, doc) => {
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
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})
router.post('/addCart', (req, res,next) => {
    const userId = 199207016
    const productId = req.body.productId
    const User = require('../models/user')
    User.findOne({userId: userId}, (err, userDoc) => {
        if (err) {
            res.json({
                status: "1",
                msg: err.message,
                result: ''
            })
        } else {
            if (userDoc) {
                var goodsItem = ''
                userDoc.cartList.forEach(item => {
                    if (item.productId === productId) {
                        goodsItem = item
                        item.productNum ++
                    }
                });
                if (goodsItem) {
                    console.log()
                    userDoc.save((err2, doc2) => {
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
                } else {
                    Goods.findOne({productId: productId}, (err1, doc1)=> {
                        if (err1) {
                            res.json({
                                status: '1',
                                msg: err.message,
                                result: ''
                            })
                        } else {
                            if (doc1) {
                                userDoc.cartList.push({
                                    "productId": doc1.productId,
                                    "productName": doc1.productName,
                                    "salePrice": doc1.salePrice,
                                    "productImage": doc1.productImage,
                                    "productNum": 1,
                                    "checked": 1
                                })
                                userDoc.save((err2, doc2) => {
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
                        }
                    })
                }
            }
        }
    })
})
module.exports = router