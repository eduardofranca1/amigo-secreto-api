class Exception extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code ?? 500;
    this.message = message ?? "Error";
  }
}

export default Exception;
