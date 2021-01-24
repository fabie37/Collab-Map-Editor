const express = require('express')
const multer = require('multer')
const verifyToken = require('./config/verifyToken')

const UserController = require('./controllers/UserController')
const DashboardController = require('./controllers/DashboardController')
const LoginController = require('./controllers/LoginController')
const EventController = require('./controllers/EventController')
const SubscriptionController = require('./controllers/SubscriptionController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')
const MapController = require('./controllers/MapController')
const NodeController = require('./controllers/NodeController')
const LayerController = require('./controllers/LayerController')


const uploadConfig = require('./config/upload')

const routes = express.Router()
const upload = multer(uploadConfig)

routes.get('/status', (req, res) => {
	res.send({ status: 200 })
})

//Map
routes.post('/createmap',verifyToken, MapController.createMap)
routes.get('/map/:map_id', verifyToken, MapController.getMapById)
routes.delete('/map/:map_id',verifyToken, MapController.delete)

//Map Browser
routes.get('/mapbrowser',verifyToken, MapController.getAllMaps)
routes.get('/mapbrowser/:map_id', verifyToken, MapController.getMapById)
routes.delete('/mapbrowser/:map_id',verifyToken, MapController.delete)

//Node
routes.post('/node',verifyToken, NodeController.createNode)
routes.get('/node/:node_id', verifyToken, NodeController.getNodeById)
routes.delete('/node/:node_id',verifyToken, NodeController.delete)

//Layer
routes.post('/createlayer',verifyToken, LayerController.createLayer)
routes.get('/layer/:layer_id', verifyToken, LayerController.getLayerById)
routes.delete('/layer/:layer_id',verifyToken, LayerController.delete)

//Login
routes.post('/login', LoginController.store)

//User
routes.post('/user/register', upload.single('profilePic'), UserController.createUser)
routes.get('/user/:userId', UserController.getUserById)
routes.get('/profile/:userId', UserController.getUserById)

//Dashboard
routes.get('/dashboard/:sport', verifyToken, DashboardController.getAllEvents)
routes.get('/dashboard', verifyToken, DashboardController.getAllEvents)
routes.get('/user/events', verifyToken, DashboardController.getEventsByUserId)
routes.get('/event/:eventId', verifyToken, DashboardController.getEventById)


//###################################################################################################################

//Events - DEPRECATED leftover from another project, will be removed!
routes.post('/event',verifyToken, upload.single('thumbnail'), EventController.createEvent)
routes.delete('/event/:eventId',verifyToken, EventController.delete)

//Subscription - DEPRECATED leftover from another project, will be removed!
routes.post('/subscription/:eventId', verifyToken, SubscriptionController.create)
routes.get('/subscription/:subscription_id', SubscriptionController.getSubscription)
routes.post('/subscription/:subscription_id/approvals', verifyToken,  ApprovalController.approval)
routes.post('/subscription/:subscription_id/rejections', verifyToken,  RejectionController.rejection)



module.exports = routes