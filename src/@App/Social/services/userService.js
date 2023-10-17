import { env } from "@App/env";
import BaseService from "@Core/api/BaseService";

class User extends BaseService {
  BASE_URL = env.WEB_BASE_URL;

  constructor(props) {
    super(props);
    this.setRequest();
  }

  getListUser = (params) => {
    const endpoint = "/api/user?limit=20";
    return this.request.get(endpoint, { params });
  };

  profile = (userId) => {
    const endpoint = `/api/user/profile?userId=${userId}`;
    return this.request.get(endpoint);
  };

  updateProfile = (data) => {
    const endpoint = '/api/user';
    return this.request.put(endpoint, data);
  };
}

export const userService = new User();
