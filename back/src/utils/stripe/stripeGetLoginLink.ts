import { stripe } from './stripe';

export default async (accountId: string) => {
    const link = await stripe.accounts.createLoginLink(accountId);
    return link;
}