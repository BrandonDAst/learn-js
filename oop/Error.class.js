class Error {
  message;
  stack;
  name = 'Error';
}

class DomainError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'DomainError';
    this.code = code;
  }
}