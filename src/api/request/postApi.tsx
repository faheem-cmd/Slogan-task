import {AxiosInstance} from '../axios';
import axios from 'axios';

async function getPost() {
  return await AxiosInstance.get(`get_posts`);
}

async function getCategory() {
  return await AxiosInstance.get(`list_CompanyCategories`);
}

async function createNewPost(data: any) {
  return await AxiosInstance.post(`create_Post`, data, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
}

async function getCommentsByPost(data: any) {
  return await AxiosInstance.get(`get_slogans_byPost`, {
    params: data,
  });
}

export const postData = {
  getPost,
  getCategory,
  createNewPost,
  getCommentsByPost,
};
