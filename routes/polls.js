import { Router } from 'express'
import * as pollsCtrl from '../controllers/polls.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

// GET localhost:3000/polls
router.get('/', pollsCtrl.index)

router.post('/', isLoggedIn, pollsCtrl.create)

export {
    router,
}