import { DefaultOptionType } from 'rc-tree-select/lib/TreeSelect';
import moment from 'moment';
import _get from 'lodash/get';
import { Category, FileUpload, Filter, Paging } from 'models';
import { filter, findIndex, forEach, isEmpty, map } from 'lodash';
import { modal } from './notify';
import { Banner, TBannerType } from 'models/setting';
import { RadioChangeEvent } from 'antd';
import { checkMobile } from './checkIsMobile';
import { mobileAndTabletCheck } from './checkMobileOrTablet';
import { ALL_ITEM, FILTER_LOGIC, FILTER_OPERATION } from './constant';

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
export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }
};

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
      value: rest.id as string | number,
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
    slider?.classList.add('active');
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

export const getAvatar = (images: FileUpload[]) => {
  if (!images || images.length < 1) return '';
  const imgObject = filter(images, img => !isEmpty(img.fileContent))?.[0];
  if (imgObject) {
    return imgObject.fileContent || '';
  }
};

export const showConfirmDelete = (data: any, onDelete: Function) => {
  modal.confirm({
    title: 'Do you want to delete this item?',
    okText: 'Yes',
    cancelText: 'No',
    async onOk() {
      await onDelete(data);
    },
  });
}

export const getBannersByType = (banners: Banner[], type: TBannerType) => {
  return filter((banners), b => (b.bannerType?.name) === type) || [];
}

export const getDateFormatted = (dateString: any, locale: 'en' | 'vi' = 'en') => {
  const date = new Date(dateString)
  let year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
  const day = new Intl.DateTimeFormat(locale, { day: '2-digit' }).format(date);
  const hour = new Intl.DateTimeFormat(locale, { hour: '2-digit' }).format(date);
  const minute = new Intl.DateTimeFormat(locale, { minute: '2-digit' }).format(date);

  return `${day}/ ${month}/ ${year}  ${hour}:${minute}`
}

export const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case 'production':
      url = 'https://tieuphuongcrochet-90b41ee4488a.herokuapp.com/';
      break;
    case 'development':
    default:
      url = 'http://localhost:8080/';
  }

  return url;
}

/**
 * Get the document's vertical scroll position
 */
export const _scrollTop = function () {
  return Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop
  );
};

export function addScrollClasses(name: string) {

  const items = document.querySelectorAll(name);
  if (items?.length < 1) return;

  let i = 0;
  forEach(items, (item, index) => {
    const scrollTop = _scrollTop();
    const divider = getElement('.header-divider');
    const dividerMarginT = window.getComputedStyle(divider)?.marginTop?.split('p')[0];
    const dividerHeight = parseInt(dividerMarginT) * 2;

    const HEGHT_ADD_CLASS = (checkMobile() || mobileAndTabletCheck()) ? -dividerHeight : dividerHeight;

    const triggerPosition = (item as HTMLDivElement)?.offsetTop + HEGHT_ADD_CLASS;

    if (scrollTop >= triggerPosition) {
      item?.classList.add('scrolling');
      i++;
    }
  });

  return i === items.length;
};

export const addScrollClass = (element: HTMLElement) => {
  let added = false;
  const scrollTop = _scrollTop();
  const elTop = element?.offsetTop;

  if (scrollTop > elTop / 6) {
    element?.classList.add('scrolling')
    added = true;
  }
  return added;
}

export const animationHeader = (name?: string) => {
  const element = getElement(name || '.scroll-animate');

  // <-- Mobile or tablet
  if (checkMobile() || mobileAndTabletCheck()) {
    setTimeout(() => {
      element?.classList.add('scrolling');
    }, 0);
    return () => element?.classList.remove('scrolling');
  }

  // <-- DOM-Window, extends DOM-EventTarget
  const win: Window = window;
  const onScroll: EventListener = () => {
    const added = addScrollClass(element);
    added && win.removeEventListener("scroll", onScroll);
  };

  win.addEventListener("scroll", onScroll);
  return () => win.removeEventListener("scroll", onScroll);
}


export const animationHome = () => {
  const items = document.querySelectorAll('.scroll-animate');
  if (checkMobile() || mobileAndTabletCheck()) {
    items[0]?.classList.add('scrolling');
  }

  // <-- DOM-Window, extends DOM-EventTarget
  const win: Window = window;
  const onScrollHome: EventListener = () => {
    const added = addScrollClasses('.scroll-animate');
    if (added) {
      win.removeEventListener("scroll", onScrollHome);
    }
  };

  win.addEventListener("scroll", onScrollHome);
  return () => win.removeEventListener("scroll", onScrollHome);
}

export function mapImagesPreview(images: FileUpload[]) {
  const list = map(images, img => ({ src: img.fileContent, alt: img.fileName }));
  return filter(list, l => !isEmpty(l.src));
}

export const onScrollBody = (name: string) => {
  const topHeight = getElement(name)?.offsetTop;
  window.scrollTo(0, topHeight);
}

export const checkPdfFile = (fileName: string) => {

  var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
  return ext === 'pdf';
};

export function filterByText(value: string, ...keys: any[]): Filter {
  if (!value) return {} as Filter;
  return {
    filterLogic: FILTER_LOGIC.ANY,
    filterCriteria: map(keys, (key) => (
      {
        key,
        operation: FILTER_OPERATION.LIKE,
        value
      })
    )
  }
}


export const mapNameFilters = (filters: Filter[], name: string, obFilter: Filter): Filter[] => {
  let tempFilters: Filter[] = [...filters];

  const index = findIndex(tempFilters, f => f.name === name);

  if (index > -1) {
    (!obFilter || Object.keys(obFilter).length < 1) ?
      tempFilters.splice(index, 1) :
      tempFilters[index] = {
        name,
        ...obFilter
      };
  } else {
    tempFilters = [
      ...tempFilters,
      {
        name,
        ...obFilter
      }
    ]
  }

  return tempFilters;
}

export const getFilters = (filter: Filter[]) => {
  return map(filter, t => {
    const newFilter: Filter = {
      filterLogic: t.filterLogic,
      filterCriteria: t.filterCriteria
    }
    return newFilter
  })
}

export const getCategoryFilter = (key: React.Key) => {
  const categoryFilter: Filter = (key === ALL_ITEM.key || !key) ? {} as Filter :
    {
      name: 'category',
      filterLogic: FILTER_LOGIC.ALL,
      filterCriteria: [
        {
          key: 'category.id',
          value: [`${key}`],
          operation: FILTER_OPERATION.IN
        }
      ],
    };
  return categoryFilter;
}

export const getRadioFilter = (e: RadioChangeEvent): Filter => {
  const value = e.target.value;
  
  if (value === ALL_ITEM.key) {
    return {} as Filter;
  }

  return {
    name: 'isHome',
    filterLogic: FILTER_LOGIC.ALL,
    filterCriteria: [
      {
        key: 'isHome',
        value: value,
        operation: FILTER_OPERATION.EQUAL
      }
    ]
  }
}