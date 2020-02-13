import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .status({ error: 'Only provider can load notication' });
    }

    // no mongoose os métodos para consultar mudam (ex: .find() == findAll() )
    const notication = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notication);
  }
}

export default new NotificationController();
