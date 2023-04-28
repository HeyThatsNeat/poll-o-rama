import { Router } from 'express'
import * as profilesCtrl from '../controllers/profiles.js'

import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', isLoggedIn, profilesCtrl.index)
router.get('/:profileId', isLoggedIn, profilesCtrl.show)
router.delete('/:profileId/:pollId', isLoggedIn, profilesCtrl.delete)
router.get('/:profileId/:pollId/edit', isLoggedIn, profilesCtrl.edit)
router.put('/:profileId/:pollId', isLoggedIn, profilesCtrl.update)



export {
    router,
}