const express = require('express')
const multer = require('multer')
const verifyToken = require('./config/verifyToken')

const UserController = require('./controllers/UserController')
const EventController = require('./controllers/EventController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const SubscriptionController = require('./controllers/SubscriptionController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')
const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/status', (req, res) => {
	res.send({ status: 200 })
})

//Subscription
routes.post('/subscription/:eventId', verifyToken, SubscriptionController.create)
routes.get('/subscription/:subscription_id', SubscriptionController.getSubscription)
routes.post('/subscription/:subscription_id/approvals', verifyToken,  ApprovalController.approval)
routes.post('/subscription/:subscription_id/rejections', verifyToken,  RejectionController.rejection)

//Login
routes.post('/login', LoginController.store)

//Dashboard
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/user/events', verifyToken, DashboardController.getEventsByUserId)
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById)

//Events
routes.post('/event',verifyToken, upload.single('thumbnail'), EventController.createEvent)
routes.delete('/event/:eventId',verifyToken, EventController.delete)

//User
routes.post('/user/register', upload.single('profilePic'), UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)
routes.get('/profile/:userId', UserController.getUserById)

module.exports = routes