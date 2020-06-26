import { RequestHandler } from 'express'
import mongoose from 'mongoose'

export const getNewDocumentId: RequestHandler = (req, res, next) => {
    req.documentId = new mongoose.Types.ObjectId().toHexString()
    next()
}