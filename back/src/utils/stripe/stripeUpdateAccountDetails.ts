import Stripe from 'stripe';
import User from '../model/Auth';

const stripeUpdateAccountDetails = async (account: Stripe.Account) => {
    if (!account.id) return;
    const user = await User.findOne({ 'stripeAccount.stripeAccountId': account.id })
    user.stripeAccount.chargesEnabled = account.charges_enabled;
    await user.save()
    console.log('[Stripe] User updated: ' + user.id)
}

export default stripeUpdateAccountDetails;