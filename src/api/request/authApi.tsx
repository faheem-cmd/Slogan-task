import {AxiosInstance} from '../axios';

async function loginApi(data: any) {
  return await AxiosInstance.post(`login`, data);
}

export const user = {
  loginApi,
};
