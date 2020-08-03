import { RequestHandler } from 'express';
import { NewsletterUser } from '../model/newsLetter'
import { sendEmail } from '../middlewere/AppFeaures';
import AppError from '../Error/AppError';

async function getAllEmailsFromDatabase() {
    const newsletterUsers = await NewsletterUser.find();

    const emails = newsletterUsers.map(newsletterUser => {
        return newsletterUser.email;
    })

    return emails;
}

export const subscribe: RequestHandler = async (req, res) => {
    const { email } = req.body;

    const newsletterUser = await NewsletterUser.create({ email })

    res.status(201).json({
        status: 'success',
        data: newsletterUser,
    });
}

export const getAllEmails: RequestHandler = async (req, res) => {
    const emails = await getAllEmailsFromDatabase()

    res.status(200).json({
        status: 'success',
        data: emails
    })
}

export const sendNewsletter: RequestHandler = async (req, res) => {
    const { html } = req.body;
    if (!html) throw new AppError('Please include html on the body', 400)

    const recipients = await getAllEmailsFromDatabase();
    if (recipients.length === 0) throw new AppError('No recipients found', 404);

    const bcc = recipients.join(',') as any;

    await sendEmail({
        ...bcc as any,
        subject: 'Halalpage - Newsletter',
        html
    })
    res.json({
        status: 'success',
        message: 'Newsletter sent'
    })
}