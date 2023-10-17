import { env } from "@App/env";
import BaseService from "@Core/api/BaseService";
import moment from "moment";

class Post extends BaseService {
  BASE_URL = env.WEB_BASE_URL;

  constructor(props) {
    super(props);
    this.setRequest();
  }

  createPost = (data) => {
    const endpoint = "/api/post";
    return this.request.post(endpoint, data);
  };

  getListPost = (params) => {
    const endpoint = "/api/post";
    return this.request.get(endpoint, { params });
  };

  listPostOfUser = (params, user_id) => {
    const endpoint = `/api/post?userId=${user_id}`;
    return this.request.get(endpoint, { params });
  };

  comment = (data) => {
    const endpoint = "/api/comment";
    return this.request.post(endpoint, data);
  };


  listComment = (params) => {
    const endpoint = "/api/comment";
    return this.request.get(endpoint, { params });
  };

  checkUserLike = (postId) => {
    const endpoint = `/api/like/checkUserLike?postId=${postId}`;
    return this.request.get(endpoint);
  };

  totalLike = (postId) => {
    const endpoint = `/api/like/totalLike?postId=${postId}`;
    return this.request.get(endpoint);
  };

  like = (data) => {
    const endpoint = "/api/like";
    return this.request.post(endpoint, data);
  };

  unLike = (postId) => {
    const endpoint = `/api/like/${postId}`;
    return this.request.delete(endpoint);
  };

  deleteComment = (commentId) => {
    const endpoint = `/api/comment/${commentId}`;
    return this.request.delete(endpoint);
  };

  getListLike = (params) => {
    const endpoint = "/api/like";
    return this.request.get(endpoint, { params: params });
  };

  postDetail = (postId) => {
    const endpoint = `/api/post/${postId}`;
    return this.request.get(endpoint);
  };

}

export const postService = new Post();
