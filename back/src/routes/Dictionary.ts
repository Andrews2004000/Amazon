import Router from 'express-promise-router';
import GetBrands from '../controllers/getBrands';
import GetClothes from '../controllers/getClothes'
import GetColors from '../controllers/getColors';
import GetDelivery from '../controllers/GetDelivery';
import GetRelease from '../controllers/GetRelease';
const router = Router();


router.route('/brands').get(GetBrands);
router.route('/clothes').get(GetClothes);
router.route('/delivery').get(GetDelivery);
router.route('/colors').get(GetColors)
router.route('/release').get(GetRelease)
export default router