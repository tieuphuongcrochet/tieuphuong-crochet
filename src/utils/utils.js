
// import _get from 'lodash/get';
// import _isEmpty from 'lodash/isEmpty';
// import _lastIndexOf from 'lodash/lastIndexOf';

// export function dispatchAction(action, ...params) {
//   // eslint-disable-next-line no-underscore-dangle
//   window.g_app._store.dispatch(action.call(null, ...params));
// }

// export function hasResponseError(response, action, ...params) {
//   if (action) {
//     dispatchAction(action, ...params);
//   }
//   const statusCode = _get(response, 'statusCode', null);
//   const errors = _get(response, 'errors', []);

//   const isHaveError = errors.length > 0;
//   if (!statusCode && !isHaveError) {
//     return false;
//   }
  
//   const isValidStatus = (statusCode >= 200 && statusCode < 300);
  
//   return !isValidStatus;
// }