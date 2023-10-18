import { env } from "@App/env";
import BaseService from "@Core/api/BaseService";

class Chat extends BaseService {
  BASE_URL = env.WEB_BASE_URL;

  constructor(props) {
    super(props);
    this.setRequest();
  }

  getListMessage = (params) => {
    const endpoint = "/api/chat";
    return this.request.get(endpoint, { params });
  };

  createMessage = (data) => {
    const endpoint = "/api/chat";
    return this.request.post(endpoint, data);
  };

  deleteMessage = (messageId) => {
    const endpoint = `/api/chat/${messageId}`;
    return this.request.delete(endpoint);
  };
 
}

export const chatService = new Chat();
