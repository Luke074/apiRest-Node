import { StatusCodes } from 'http-status-codes';
import { Cidade } from './../../../interfaces/cidade';
import { Request, RequestHandler, Response } from "express";
import * as yup from "yup";

const bodyValidator = yup.object().shape({
    nome: yup.string().required().min(4).max(150),
    estado: yup.string().required().min(4).max(150)
});

export const validateBody: RequestHandler = async (req, res, next) => {
    try {
        await bodyValidator.validate(req.body, { abortEarly: false });
        return next();

    } catch (err) {
        const yupError = err as yup.ValidationError;
        const validatorErrors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            if (error.path === undefined) return

            validatorErrors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            error: validatorErrors
        });
    }
};

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {

    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: "City created with success!"
    });
};