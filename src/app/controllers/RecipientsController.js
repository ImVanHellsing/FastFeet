import * as Yup from 'yup';

// import User from '../models/User';
import Recipient from '../models/Recipient';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      uf: Yup.string().required(),
      cep: Yup.string().required(),
      city: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      console.log(req.body);

      return res.status(400).json({ error: 'Validation failure.' });
    }

    const {
      street,
      number,
      complement,
      uf,
      city,
      cep,
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
    try {
      const recipients = await Recipient.findAll();

      if (!recipients) {
        // console.log('Recipients not found');

        return res.status(404).json({ message: 'Recipients not found.' });
      }

      return res.json(recipients);
    } catch (error) {
      console.log(`Error= ${error}`);
      return res.status(500).json({ message: 'Error occured.' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const data = await Recipient.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Recipient not found.' });
    }

    const {
      street,
      number,
      complement,
      uf,
      city,
      cep,
    } = await Recipient.update(req.body, { where: { id } });

    return res.json({
      street,
      number,
      complement,
      uf,
      city,
      cep,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const data = await Recipient.findByPk(id);

    if (!data) {
      return res.status(404).json({ error: 'Recipient not found.' });
    }

    await Recipient.destroy({ where: { id } });

    return res.json({
      message: `ID=${id}/// '${data.street} nº ${data.number}, ${data.complement}' was successfully deleted.`,
    });
  }
}

export default new RecipientsController();
