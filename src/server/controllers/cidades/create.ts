import { StatusCodes } from 'http-status-codes';
import { Cidade } from './../../../interfaces/cidade';
import { Request, Response } from "express";
import * as yup from "yup";

const bodyValidator = yup.object().shape({
    nome: yup.string().required().min(4).max(150),
    estado: yup.string().required().min(4).max(150)
});

export const create = async (req: Request<{}, {}, Cidade>, res: Response) => {
    let validate: Cidade | undefined = undefined;

    try {
        validate = await bodyValidator.validate(req.body, { abortEarly: false });
        console.log(validate);


    } catch (err) {
        const yupError = err as yup.ValidationError;
        const validatorErrors: Record<string, string> = {};

        yupError.inner.forEach(error => {
            console.log(error);

            if (error.path === undefined) return

            validatorErrors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: StatusCodes.BAD_REQUEST,
            error: validatorErrors
        });
    }

    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: "City created with success!"
    });
};