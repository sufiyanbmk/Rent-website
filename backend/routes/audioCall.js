import express from 'express';
import { startAudioCall,generateZegoToken  } from '../controllers/callController.js'

const router = express.Router()

router.post("/start-call",startAudioCall);

router.post(
  "/generate-zego-token",
  generateZegoToken
);

export default router;