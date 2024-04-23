import { DefaultOptionType } from 'rc-tree-select/lib/TreeSelect';
import _get from 'lodash/get';
import { Category, Paging } from 'models';
import moment from 'moment';
import { map } from 'lodash';

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

export const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getCurrentDate = (d: any, formatDate = 'YYYY-MM-DD') => moment(d).format(formatDate);

export const getFileNameAndExt = (name: string) => {
  if (!name) {
    return {};
  }
  const lastDot = name.lastIndexOf('.');
  const fileName = name.substring(0, lastDot);
  const ext = name.substring(lastDot + 1);

  return {
    fileName,
    ext,
  };
};

export const genBlobName = (originFileName: string, rootBlobFolder: string, uid: string) => {
  const currentDate = getCurrentDate(new Date())
  const { ext } = getFileNameAndExt(originFileName);
  const blobName = `image/${currentDate}/${rootBlobFolder}/${uid}.${ext}`;
  return blobName;
};

export function computePaging({ pageSize, pageIndex, currentIndex }: Paging) {
  return (pageIndex * pageSize) + 1 + currentIndex;
}

export const mapTreeData = (data: Category[]): DefaultOptionType[] => {
  const result = data.map((item: Category) => {
    const { children, ...rest } = item;
    let newItem: DefaultOptionType = {
      name: rest.name,
      key: rest.id,
      title: rest.name,
      value: rest.id,
    }
    if (children && children.length > 0) {
      newItem = {
        ...newItem,
        children: mapTreeData(children),
      };
    }
    return newItem;
  });
  return result;
};

export const getElement = (name: string) => {
  return document.querySelector(name) as HTMLDivElement;
}

export const DragScroll = (name: string) => {
  const slider = getElement(name); // Type assertion
  let isDown: boolean = false; // Type declaration
  let startX: number; // Type declaration
  let scrollLeft: number; // Type declaration

  slider.addEventListener('mousedown', (e: MouseEvent) => { // Type for the event
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', (e: MouseEvent) => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', (e: MouseEvent) => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e: MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  });
}

export const mapDataToSelectOption = (data: any[]) => {
  return map(data, (item: any) => {
    return {
      label: item.name,
      value: item.id,
      
    };
  });
};
