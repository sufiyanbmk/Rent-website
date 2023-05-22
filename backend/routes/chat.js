import express from 'express';
import { fetchChats, accessChat, allMessages, sendMessage, createGroup, renameGroup, removeFromGroup, addToGroup} from '../controllers/chatController.js'

const router = express.Router()

router.route("/")
.get(fetchChats)
.post(accessChat)

router.get('/:chatId',allMessages)
router.post("/messages",sendMessage)

router.post('/group',createGroup)
router.put('/rename',renameGroup)
router.put('/group-remove',removeFromGroup)
router.put('/group-add',addToGroup)


export default router;