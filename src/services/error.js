import { showThemeAlert } from '../helper/app-helper';
import { strLocale } from 'locale';
import constant from '../helper/constant';

export function checkApiStatus(data) {
  if (data === 500) {
    showThemeAlert({
      title: strLocale(constant.appName),
      message: strLocale('server.Something went wrong Please try again'),
      leftBtn: strLocale('OK'),
    });
  }
  return true;
}

export function sessionTimeOut() {
  showThemeAlert({
    title: strLocale(constant.appName),
    message: strLocale('server.Your session is expired'),
    leftBtn: strLocale('OK'),
  });
}
