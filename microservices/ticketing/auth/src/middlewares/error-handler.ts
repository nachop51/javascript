import type { Request, Response, NextFunction } from 'express'
import { CustomError } from '../errors/custom-error'

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err)

  if (err instanceof CustomError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() })
    return
  }

  res.status(500).send({
    errors: [{ message: 'Something went wrong' }]
  })
}
