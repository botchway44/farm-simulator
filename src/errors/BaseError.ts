import { SequelizeScopeError } from "sequelize/types";
import { HttpCode } from "./codes";



export default class ErrorHandler extends Error implements SequelizeScopeError {
	public description: string;
	public code: HttpCode;

	constructor(description: string, message: string, code: HttpCode) {
		super(message);
		this.message = message;
		this.description = description;
		this.code = code;
	}
}
