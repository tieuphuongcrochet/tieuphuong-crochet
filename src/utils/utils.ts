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
