const express  = require('express')
const userRoute= express()
const session = require("express-session")
const path = require('path')
const usercontroller = require('../controller/usercontroller')
const userprofilecontroller = require('../controller/user-profilecontroller')
const cartcontroller = require('../controller/cartcontroller')
const ordercontroller = require('../controller/order-controller')
//const { sendOTP } = usercontroller;


userRoute.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}))
const auth = require('../middleware/auth')
const bodyparser = require("body-parser");
userRoute.use(express.json());
userRoute.use(bodyparser.urlencoded({extended:true}))
userRoute.set('view engine','ejs');
userRoute.set('views','./views/user')
//  userRoute.use(express.static( 'public'))
// userRoute.use(express.static('public', { 'Content-Type': 'text/css' }));

 userRoute.use(express.static('public'))
 userRoute.use( express.static(path.join(__dirname, 'public/assets')))
// const usercontroller = require('../controller/usercontroller')
console.log("jhjh");
userRoute.get('/',usercontroller.loadhome)
userRoute.get('/register',auth.isLogout,usercontroller.loadregister);
userRoute.post('/register',usercontroller.insertUser)
userRoute.get('/otppage',usercontroller.loadotppage)
userRoute.post('/OTPverify',usercontroller.otpverify)
userRoute.post('/send-otp',usercontroller.sendOTP)
userRoute.post('/resend-otp',usercontroller.resendOTP)
userRoute.get('/login',usercontroller.loginload)
userRoute.post('/login',usercontroller.verifilogin)
userRoute.get('/home',auth.userblocked,auth.isLogin, usercontroller.loadhome);
userRoute.get('/logout',auth.userblocked,auth.isLogin,usercontroller.logout)
userRoute.get('/product-details/:id',auth.isLogin,auth.userblocked,usercontroller.productdet)
userRoute.get('/shop',auth.isLogin,auth.userblocked,usercontroller.displayAllProducts)
userRoute.get('/user-profile',auth.isLogin,auth.userblocked,userprofilecontroller. getprofile)
userRoute.get('/user-address',auth.isLogin,auth.userblocked,userprofilecontroller.getaddress)
userRoute.put('/updateprofile',auth.isLogin,auth.userblocked,userprofilecontroller.updateprofile)
userRoute.post('/user-address',auth.isLogin,auth.userblocked,userprofilecontroller.addaddress)
userRoute.get('/updateAddress',auth.isLogin,auth.userblocked,userprofilecontroller.editaddress)
userRoute.post('/updateAddress',auth.isLogin,auth.userblocked,userprofilecontroller.updateAddress)
userRoute.get('/deleteaddress',auth.isLogin,auth.userblocked,userprofilecontroller.deleteaddress)
userRoute.post('/addtocart',auth.isLogin,auth.userblocked,cartcontroller.addtocart)
userRoute.get('/cart',auth.isLogin,auth.userblocked,cartcontroller.getcart)
userRoute.post('/deletcart',auth.isLogin,auth.userblocked,cartcontroller.cartdelete)
userRoute.get('/checkout',auth.isLogin,auth.userblocked,cartcontroller.checkout)
userRoute.post('/updatecart',auth.isLogin,auth.userblocked,cartcontroller.updatecart)
userRoute.post('/place-order',auth.isLogin,auth.userblocked,ordercontroller.order)
userRoute.get('/forgotpasswordpage', usercontroller.forgotpasswordpage);
userRoute.post('/forgotpasswordpage', usercontroller.forgotpassword);
userRoute.get('/resetpassword',usercontroller.resetPasswordPage)
userRoute.post('/resetPassword',usercontroller.resetPassword)
userRoute.get('/changepassword',auth.isLogin,auth.userblocked,userprofilecontroller.loadchangepassword)
userRoute.post('/changepassword',auth.isLogin,auth.userblocked,userprofilecontroller.changePassword)
userRoute.get('/search',auth.isLogin,auth.userblocked,usercontroller.searchProduct)
userRoute.get('/orderdetails', auth.isLogin, auth.userblocked, userprofilecontroller.orderdetails);
userRoute.post('/cancel-order/:id',auth.isLogin,auth.userblocked,userprofilecontroller.cancelOrder);
userRoute.post('/return-order/:orderId',auth.isLogin,auth.userblocked,userprofilecontroller.returnorder)
userRoute.get('/wishlist', auth.isLogin, auth.userblocked, usercontroller.getWishlist);
userRoute.get('/add-to-wishlist', auth.isLogin, auth.userblocked, usercontroller.addWishlist);
userRoute.post('/deletewhishlist',auth.isLogin,auth.userblocked,usercontroller.deletewishlist);
userRoute.post('/verifyrazorpay',auth.isLogin,ordercontroller.verifyrazorpay)
userRoute.post('/applycoupon',auth.isLogin,auth.userblocked,ordercontroller.applycoupon)
userRoute.post('/removecoupon',auth.isLogin,auth.userblocked,ordercontroller.removecoupon)
userRoute.post('/addtowallet',auth.isLogin,auth.userblocked,userprofilecontroller.Addwallet)
userRoute.post('/verify-payment',auth.isLogin,auth.userblocked,userprofilecontroller.verifyPaymentAndAddToWallet)
userRoute.get('/order-success/:orderId',auth.isLogin,auth.userblocked,ordercontroller.OrderSuccess)
userRoute.get('/retry-payment', auth.isLogin, auth.userblocked, ordercontroller.retryPayment);
userRoute.get('/download-invoice/:orderid',auth.isLogin,auth.userblocked,userprofilecontroller.invoicedownload)
userRoute.post('/applyReferral',auth.isLogin,auth.userblocked,usercontroller.referal)


//userRoute.get('/order-details',)

// userRoute.get('*',(req,res)=>{
//     res.render('404')
// })



module.exports=userRoute
