import { Router } from 'express'
import * as pollsCtrl from '../controllers/polls.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()


router.get('/', pollsCtrl.index)
router.get('/new', pollsCtrl.new)
router.get('/:pollId/edit', isLoggedIn, pollsCtrl.edit)
router.post('/', isLoggedIn, pollsCtrl.create)
router.post('/:pollId', pollsCtrl.createAnswer)
router.delete('/:pollId', isLoggedIn, pollsCtrl.delete)
router.put('/:pollId', isLoggedIn, pollsCtrl.update)

export {
    router,
}