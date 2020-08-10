import * as Yup from 'yup';

// Models
import Recipient from '../models/Recipient';

class RecipientsController {
  async store(req, res) {
    /**
     * Yup validation
     */

    const schema = Yup.object().shape({
      uf: Yup.string().required(),
      cep: Yup.string().required(),
      city: Yup.string().required(),
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(req.body);

      return res.status(400).json({ error: 'Validation failure!' });
    }

    /**
     * Destructuring and returning the validated User Data
     */

    const {
      uf,
      cep,
      city,
      street,
      number,
      complement,
    } = await Recipient.create(req.body);

    return res.json({
      street,
      number,
      complement,
      uf,
      city,
      cep,
    });
  }

  async index(req, res) {
    /**
     * Database recipients search
     */

    try {
      const recipients = await Recipient.findAll(); 

      if (!recipients) {
        return res.status(404).json({ message: 'Recipients not found!' });
      }

      return res.json(recipients);
    } catch (error) {
      
      console.log(`Error= ${error}`);
      return res.status(500).json({ error: 'Internal server occurred!' });
    }
  }

  async update(req, res) {
    /**
     * Checking if the ID provided is valid
     */

    const { id } = req.params;

    const data = await Recipient.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Recipient not found!' });
    }

    /**
     * Destructuring and returning the validated User Data
     */

    const {
      name,
      street,
      number,
      complement,
      uf,
      city,
      cep,
    } = await Recipient.update(req.body, { where: { id } });

    return res.json({
      name,
      street,
      number,
      complement,
      uf,
      city,
      cep,
    });
  }

  async delete(req, res) {
    /**
     * Checking if the ID provided is valid
     */

    const { id } = req.params;

    const data = await Recipient.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Recipient not found!' });
    }

    // Deleting
    await Recipient.destroy({ where: { id } });

    // Returning a simple info about the recent deleted data
    return res.json({
      message: `ID=${id} => '${data.street} nº ${data.number}, ${data.complement} to ${data.name}' was successfully deleted!`,
    });
  }
}

export default new RecipientsController();
