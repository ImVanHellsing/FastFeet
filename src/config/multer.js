import { extname, resolve } from 'path'
import multer from 'multer'
import crypto from 'crypto'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, ( error, res ) => {
        if(error) return cb(error)

        // FILE NAME -> file.originalname
        return cb(null, res.toString('hex') + extname(file.originalname))
      })
    }
  })
}