import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";
import { HttpCode } from "../errors/codes";
import BaseError from "../errors/BaseError";

export const errorHandler = (
	error: BaseError | ValidationError,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	let description, message, code;
	console.log(error);

	if (error instanceof BaseError) {
		({ description, message, code } = error);
	}

	if (error instanceof ValidationError) {
		message = [];
		description = [];

		error.errors.map((err, index) => {
			message[index] = err.type;
			description[index] = err.message;
		});
		code = HttpCode.BAD_REQUEST;
	}

	return response.status(code as HttpCode).send({
		description,
		message,
		code,
	});
};
