import ExpressPromiseRouter from 'express-promise-router';
import { getAllEmails, subscribe, sendNewsletter } from '../controllers/newsLetter';
const router = ExpressPromiseRouter()

router.route('/').get(getAllEmails).post(subscribe).put(sendNewsletter)

export default router;