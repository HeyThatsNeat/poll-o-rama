import { Router } from 'express'
import * as pollfilesCtrl from '../controllers/pollfiles.js'

import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', pollfilesCtrl.index)
router.get('/:pollfileId', pollfilesCtrl.show)



export {
    router,
}