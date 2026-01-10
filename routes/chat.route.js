import express from 'express'
import {addMessage, getMessage} from '../controller/chat.controller.js'

const route = express.Router()

route.post('/addMessage',addMessage)
route.post('/getMessage',getMessage)

export default route