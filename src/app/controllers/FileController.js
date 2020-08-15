//Models
import File from '../models/File'

class FileController {
  async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
        name,
        path,
      });
  
      return res.status(201).json(file); 

    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: 'Internal server error!'}); 
    }
  }

  async index(req, res) {
    const files = await File.findAll();

    const filteredFiles = files.map(file => {
      return {
        id: file.id,
        url: file.url,
        path: file.path,
        name: file.name,
      }
    })

    return res.status(200).json(filteredFiles);
  }
}

export default new FileController()