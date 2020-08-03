
import { RequestHandler } from 'express';
import { OAuth2Client } from 'google-auth-library'

const CLIENT_ID = "963955517148-k711jcgdvt06v667r0ntm2epiddo1jd0.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

export async function getGoogleUserId(token: string) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
    });
    const user = ticket.getPayload();
    if (!user) throw new Error('No user found')
    const userId = user.sub;
    const userEmail = user.email;
    const userName = user.name;
    return { userId, userEmail, userName } as any;
}

export const googleLogin: RequestHandler = async (req, res) => {
    const token = req.query.token as string;
    const data = await getGoogleUserId(token)

    res.json({ alive: true, data })
}