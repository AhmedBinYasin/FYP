import express from 'express';
import { SpeechClient} from '@google-cloud/speech';
const upload = require('../middleware/upload')
import { Readable } from 'stream';

interface MulterRequest extends express.Request {
    file: any;
}
type SpeechRequest = {
    audio: { content: Buffer };
    config: {
      encoding: "FLAC" | "ENCODING_UNSPECIFIED" | "LINEAR16" | "MULAW" | "AMR" | "AMR_WB" | "OGG_OPUS" | "SPEEX_WITH_HEADER_BYTE" | "WEBM_OPUS" | null | undefined;
      sampleRateHertz: number;
      languageCode: string;
    };
  };

const router = express.Router()


// Route:1 auth a user
router.post('/toText', upload.single('file'), async (req: express.Request, res: express.Response) => {
    try {
        const client = new SpeechClient();
        const file = (req as MulterRequest).file;
        const request: SpeechRequest = {
            audio: { content: file },
            config: {
              encoding: 'FLAC',
              sampleRateHertz: 44100,
              languageCode: 'en-US',
            }
          };
          const [response] = await client.recognize(request);
          const transcription = response.results?.map(result => result.alternatives && result.alternatives[0]?.transcript).join('\n');
          console.log(transcription)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'server error' })
    }
},
)


export default router;