import { ZodError } from 'zod';

export class ParsingError extends Error {
  constructor(public error: ZodError) {
    super(error.toString());
    this.name = this.constructor.name;
  }
}
