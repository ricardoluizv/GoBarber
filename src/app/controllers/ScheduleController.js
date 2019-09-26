import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          // Op.between: retorna um simbolo, ou seja, uma parte de uma instrução que compreende o atributo
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)], // date between 27/09/2019 00:00:01 and 27/09/2019 23:59:59
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
}
}

export default new ScheduleController();
