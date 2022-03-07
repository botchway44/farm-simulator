import { NextFunction, Request, Response } from "express";
import { ValidationError } from "sequelize";
import { HttpCode } from "../errors/codes";
import ErrorHandler from "../errors/BaseError";

export const errorHandler = (
	error: ErrorHandler | ValidationError,
	request: Request,
	response: Response,
	next: NextFunction
) => {
	let description, message, code;
	console.log("Error is an instance of ", "BAse error", error instanceof ErrorHandler, "Validation error", error instanceof ValidationError);

	if (error instanceof ErrorHandler) {
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
