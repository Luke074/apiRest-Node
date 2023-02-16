import { StatusCodes } from 'http-status-codes';
import { Cidade } from './../../../interfaces/cidade';
import { Request, Response } from "express";

export const create = (req: Request<Cidade>, res: Response) => {
    const data: Cidade = req.body;

    if (req.body.nome === undefined) {
        return res.status(StatusCodes.BAD_REQUEST).send("Informe o nome!");
    }

    if (req.body.estado === undefined) {
        return res.status(StatusCodes.BAD_REQUEST).send("Informe o estado!");
    }

    return res.status(StatusCodes.ACCEPTED).send('Creted!');
};