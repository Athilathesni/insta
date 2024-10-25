import { Router } from 'express'
import *as rh from './requesthandler.js'
const router=Router()


router.route('/adduser').post(rh.adduser)



export default router