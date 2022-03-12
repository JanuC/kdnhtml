/**
 * 该 js 文件用于统一管理接口
 */
import { post } from "./http";
export const apiAddress = (url, params) => post(url, params);
