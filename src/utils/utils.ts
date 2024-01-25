import _get from 'lodash/get';

export function hasResponseError(response: any) {
  const statusCode = _get(response, 'statusCode', null);
  const errors = _get(response, 'errors', []);

  const isHaveError = errors.length > 0;
  if (!statusCode && !isHaveError) {
    return false;
  }

  const isValidStatus = (statusCode >= 200 && statusCode < 300);

  return !isValidStatus;
}

export const setCookie = (cookieName: string, cookieValue: string, expiresHour: number) => {
  const d = new Date();
  d.setTime(d.getTime() + expiresHour * 60 * 60 * 1000);
  const expires = `expries=${d.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
}

export const getCookie = (cookieName: string) => {
  const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
  if (match) return match[2];
  return '';
}
