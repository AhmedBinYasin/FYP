import express from 'express';
const { Leopard } = require("@picovoice/leopard-node");
const upload = require('../middleware/upload')


const router = express.Router()

export interface File {
  name: string;
  size: number;
  type: string;
  extension: string;
  content: ArrayBuffer;
}
export interface UploadedFile {
  path: string;
}
export interface FileUpload {
  upload: (files: File[]) => Promise<UploadedFile[]>;
}
export interface FileUploader {
  upload: (
    files: File | File[]
  ) => Promise<UploadedFile | UploadedFile[] | undefined>;
}

// Route:1 auth a user
router.post('/toText', upload.single('file'), async (req: express.Request, res: express.Response) => {
  try {
    return res.json({ status: true, transcription: "failed" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'server error' })
  }
},
)


export default router;