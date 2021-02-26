class BaseError extends Error {
  constructor(details) {
    const messages = details?.map(e => e.descriptionDetail).flat();
    super(messages);
  }
}

export class GenericError extends BaseError {
  constructor(details) {
    super(details);
  }

  get httpStatus() {
    return 500;
  }
}

export class InvalidRequest extends BaseError {
  constructor(details) {
    super(details);
  }

  get httpStatus() {
    return 400;
  }
}

export class UnauthorizedError extends BaseError {
  constructor(details) {
    super(details);
  }

  get httpStatus() {
    return 401;
  }
}

export const handleError = error => {
  const { response } = error;

  if (response) {
    switch (response.status) {
      case 400:
        return new InvalidRequest(response.data.details);
        break;
       case 401:
        return new UnauthorizedError(response.data.details);
        break;
      default:
        return new GenericError(response.data.details);
        break
    }
  } else {
    return error;
  }
}
