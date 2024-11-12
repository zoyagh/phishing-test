import Cookies from "js-cookie";

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

export const setCookie = (name: string, value: string, expires?: number): void => {
  const options = expires ? { expires } : {};
  Cookies.set(name, value, options);
};
