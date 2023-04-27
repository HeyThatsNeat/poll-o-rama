import { Router } from 'express'
import * as pollfilesCtrl from '../controllers/pollfiles.js'

import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, pollfilesCtrl.index)
router.get('/:pollfileId', isLoggedIn, pollfilesCtrl.show)
router.delete('/:pollfileId/:pollId', isLoggedIn, pollfilesCtrl.delete)
router.get('/:pollfileId/:pollId/edit', isLoggedIn, pollfilesCtrl.edit)
router.put('/:pollfileId/:pollId', isLoggedIn, pollfilesCtrl.update)



export {
    router,
}