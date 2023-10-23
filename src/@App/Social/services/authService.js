import { env } from "@App/env";
import BaseService from "@Core/api/BaseService";

class Auth extends BaseService {
  BASE_URL = env.WEB_BASE_URL;

  constructor(props) {
    super(props);
    this.setRequest();
  }

  login = (data) => {
    const endpoint = "/api/auth/user/login";
    return this.request.post(endpoint, data);
  };

  register = (data) => {
    const endpoint = "/api/auth/user/register";
    return this.request.post(endpoint, data);
  };

  logout = (data) => {
    const endpoint = "/api/auth/user/logout";
    const dataSubmit = {
      refreshToken: data,
    };
    return this.request.post(endpoint, dataSubmit);
  };

  resetPassword = (data) => {
    const endpoint = "/api/auth/user/reset-password";
    return this.request.post(endpoint, data);
  };

  refreshToken = (token) => {
    const endpoint = "api/auth/customer/refreshToken";
    return this.request.post(endpoint, token);
  };
}

export const authService = new Auth();
