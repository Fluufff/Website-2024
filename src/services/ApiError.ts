export class ApiError extends Error {
  constructor(public response: Response) {
    super(`${response.status} ${response.statusText} (${response.url})`);
    this.name = this.constructor.name;
  }
}
