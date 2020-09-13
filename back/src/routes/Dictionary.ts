import Router from 'express-promise-router';
import GetBrands from '../controllers/getBrands';


const router = Router();


router.route('/brands').get(GetBrands);

export default router