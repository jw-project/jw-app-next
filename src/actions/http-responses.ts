abstract class ServerActionSpread {
  toServerAction() {
    return {
      ...this,
    };
  }
}

export class HttpSuccess<T> extends ServerActionSpread {
  status = 200;

  success: true = true;

  data?: T;

  constructor(data?: T) {
    super();
    this.data = data;
  }
}

// errors

abstract class HttpError extends ServerActionSpread {
  name: string;

  message: string;

  status: number;

  success: false = false;

  field?: string;

  constructor(message: string, status: number, args?: object) {
    super();
    this.message = message;
    this.status = status;
    this.name = this.constructor.name;
    Object.assign(this, args);
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'common.errors.bad-request', args?: object) {
    super(message, 400, args);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'common.errors.unauthorized-request', args?: object) {
    super(message, 401, args);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'common.errors.forbidden-request', args?: object) {
    super(message, 403, args);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'common.errors.not-found-request', args?: object) {
    super(message, 404, args);
  }
}

export class InputError extends BadRequestError {
  constructor(field: string, message: string) {
    super(message, { field });
  }
}
