import Utils from "../utils/utils";

class AuthService {
  validatePassword = (password: string) => {
    // split and join for = 10/10/2020 = 10102020
    const currentPassword = Utils.getToday().split("/").join("");
    return password === currentPassword;
  };

  createToken = () => {
    const currentPassword = Utils.getToday().split("/").join("");
    return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
  };

  validateToken = (token: string) => {
    const currentToken = this.createToken();
    return token === currentToken;
  };
}

export default new AuthService();
