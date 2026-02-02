import express from 'express'
import {addMessage, getMessage,getNoti} from '../controller/chat.controller.js'

const route = express.Router()

route.post('/addMessage',addMessage)
route.post('/getMessage',getMessage)
route.post('/getNoti',getNoti)

export default route