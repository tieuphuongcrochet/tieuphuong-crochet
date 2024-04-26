import pattern1 from '../assets/patterns/v1.jpg';
import pattern2 from '../assets/patterns/v2.jpg';
import pattern3 from '../assets/patterns/v3.jpg';
import pattern4 from '../assets/patterns/v4.jpg';
import pattern5 from '../assets/patterns/v5.jpg';
import pattern6 from '../assets/patterns/pt6.jpg';
import pattern7 from '../assets/patterns/v6.jpg';
import pattern8 from '../assets/patterns/v7.jpg';
import shopee from '../assets/socials/shope.jpg';

import banner2 from '../assets/bn4.jpg';
import banner3 from '../assets/bn3.jpg';
import banner4 from '../assets/banner2.jpg';

export const LANGUAGES = {
  VN: 'vi-VN',
  EN: 'en-US'
};

export const CURRENCY = {
  VND: 'VND',
  USD: 'USD',
};

export const CURRENCY_LIST = [
  {
      value: CURRENCY.VND,
      label: CURRENCY.VND,
  },
  {
      value: CURRENCY.USD,
      label: CURRENCY.USD
  },
]

export const LANGUAGES_LIST = [
  {    key: LANGUAGES.VN, label: 'VN'  },
  {    key: LANGUAGES.EN, label: 'EN'  },
];

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

export const LOCAL_STORAGE_NAMES = {
  SYSTEM_AUTHORITY: 'system-authority',
  ACCESS_TOKEN: 'accessToken',
};

export const COOKIE_NAMES = {
  REFRESHER_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
};

export const ROUTE_PATH = {
  HOME: '/',
  SHOP: '/shop',
  FREEPATTERNS: '/free-patterns',
  BLOG: '/blog',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  ADMIN: '/admin',
  REGISTER: '/register',
  ADMIN_PATTERNS: '/admin/patterns',
  AMIN_PRODUCTS: '/admin/products',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTING: '/admin/setting',
  ADMIN_POSTS: '/admin/blog',
  ADMIN_CATEGORY: '/admin/category',
  CREATE: 'create',
  DETAIL: 'detail'
};

export const MENU_NAV = [
  { path: ROUTE_PATH.HOME, name: 'menu_nav.home' },
  { path: ROUTE_PATH.SHOP, name: 'menu_nav.shop' },
  { path: ROUTE_PATH.FREEPATTERNS, name: 'menu_nav.freePattern' },
  // { path: ROUTE_PATH.BLOG, name: 'menu_nav.blog' },
  { path: ROUTE_PATH.ABOUT, name: 'menu_nav.about' },
  { path: ROUTE_PATH.CONTACT, name: 'menu_nav.contact' },
];

export const BREADCRUMB = [
  { path: ROUTE_PATH.HOME, name: 'menu_nav.home' },
  { path: ROUTE_PATH.SHOP, name: 'menu_nav.shop' },
  { path: ROUTE_PATH.FREEPATTERNS, name: 'menu_nav.freePattern' },
  { path: ROUTE_PATH.BLOG, name: 'menu_nav.blog' },
  { path: ROUTE_PATH.ABOUT, name: 'menu_nav.about' },
  { path: ROUTE_PATH.CONTACT, name: 'menu_nav.contact' },
  { path: ROUTE_PATH.DETAIL, name: 'menu_nav.detail' },
  { path: ROUTE_PATH.CREATE, name: 'menu_nav.create' },
];

export const REGEX = {
  PHONE_NUMBER: /^(0|\+?84)\d{9}$/,
  // eslint-disable-next-line no-control-regex
  EMAIL:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  EMAIL_AIA:
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@aia\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  IDENTIFY: /^[0-9]{9}$/,
  POLICY_NUMBER: /^[a-zA-Z]{1}[0-9]{9}$/,
  BILLING: /^[0-9]{7}$/,
  NUMBER: /^\d+$/,
  FW_POLNUM: /^[C|U][0-9]{9}$/,
  VN_TEXT_ONLY:
    /^[a-zA-Z 0-9\.\,\+\-\;\&\_\\\)\(\/\" a|à|á|ạ|ả|ã â|ầ|ấ|ậ|ẩ|ẫ ă|ằ|ắ|ặ|ẳ|ẵ đ e|è|é|ẹ|ẻ|ẽ ê|ề|ế|ệ|ể|ễ i|ì|í|ị|ỉ|ĩ o|ò|ó|ọ|ỏ|õ ô|ồ|ố|ộ|ổ|ỗ ơ|ờ|ớ|ợ|ở|ỡ u|ù|ú|ụ|ủ|ũ ư|ừ|ứ|ự|ử|ữ y|ỳ|ý|ỵ|ỷ|ỹ]*$/,
  ID_NO: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  VN_NAME:
    /^[a-zA-Z0-9 aàáạảã âầấậẩẫ ăằắặẳẵ đ eèéẹẻẽ êềếệểễ iìíịỉĩ oòóọỏõ ôồốộổỗ ơờớợởỡ uùúụủũ ưừứựửữ yỳýỵỷỹ]*$/i,
  MULTI_EMAIL:
    /^([A-Za-z0-9\.|-|_]*[@]{1}[A-Za-z0-9\.|-|_]*[.]{1}[a-z]{2,5})(;[A-Za-z0-9\.|-|_]*[@]{1}[A-Za-z0-9\.|-|_]*[.]{1}[a-z]{2,5})*?$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*\-_!+=\[\]{}|\\:',.?/`~"();])(?!.*@\.)[A-Za-z\d@#$%^&*\-_!+=\[\]{}|\\:',.?/`~"();]{8,}$/,
  USERNAME: /^(\d|\w)+$/,
};

export const ALL_ITEM = {
  label: 'tab.all',
  key: 'all'
};

export const MOCK_FREE_PATTERNS = [
  {
    id: '1',
    src: pattern1,
    author: 'Tiểu Phương',
    name: 'Mặt trời ú',
  },
  {
    id: '1',
    src: pattern2,
    author: 'Susan family',
    name: 'Gối hoa',
  },
  {
    id: '1',
    src: pattern3,
    author: 'Vô danh',
    name: 'Túi gấu nhỏ',
  },
  {
    id: '1',
    src: pattern4,
    author: 'Tiểu Vũ',
    name: 'Búp bê',
  },
  {
    id: '1',
    src: pattern5,
    author: 'Vô sắc',
    name: 'Cây thông noel',
  },
  {
    id: '1',
    src: pattern6,
    author: 'Sưu tầm',
    name: 'Đầu cừu',
  },
  {
    id: '1',
    src: pattern7,
    author: 'Sưu tầm',
    name: 'Thú nhỏ',
  },
  {
    id: '1',
    src: pattern8,
    author: 'Sưu tầm',
    name: 'Kẹo hồ lô',
  },
];

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://www.facebook.com/tieuconuong.tiemlen/',
  SOPEE: 'https://shopee.vn/littlegirl.crochet',
  INSTAGRAM: 'https://www.instagram.com/little_girl.crochet/',
  TIKTOK: 'https://www.tiktok.com/@tiemlentieuconuong'
};

export const SOCIALS = [
  {
    social: 'Shopee',
    src: shopee,
    url: SOCIAL_LINKS.SOPEE,
    textColor: '#fa5330',
  },
  { social: 'Facebook', textColor: '#0866ff' },
  {
    social: 'Instagram',
    textColor: '#e42a81',
    url: SOCIAL_LINKS.INSTAGRAM,
  },
  { social: 'Tiktok', url:  SOCIAL_LINKS.TIKTOK},
];

export const FOOTER_LINK = [
  { name: 'Home', path: ROUTE_PATH.HOME },
  { name: 'Shop', path: ROUTE_PATH.SHOP },
  { name: 'Patterns', path: ROUTE_PATH.FREEPATTERNS },
  { name: 'Blog', path: ROUTE_PATH.BLOG },
  { name: 'About', path: ROUTE_PATH.ABOUT },
  { name: 'Contact', path: ROUTE_PATH.CONTACT },
];

export const IMAGE_FALLBACK = `data:image/png;base64,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`;

export const MOCK_BLOGS = [
  {
    src: banner2,
    name: 'Các ký hiệu trong chart móc len',
    description: 'Aypi non habent claritatem  insitam. Aypi non habent claritatem  insitam.',
  },
  {
    src: banner3,
    name: 'Các ký hiệu trong chart móc len',
    description: 'Aypi non habent claritatem  insitam. Aypi non habent claritatem  insitam. ',
  },
  {
    src: banner4,
    name: 'Các ký hiệu trong chart móc len',
    description: 'Aypi non habent claritatem  insitam. Aypi non habent claritatem  insitam. ',
  },
];


export const OPERATOR = {
  GREATER_THAN: 'GREATER_THAN',
    LESS_THAN: 'LESS_THAN',
    EQUALS: 'EQUALS',
    LIKE: 'LIKE',
    NOT_EQUALS: 'NOT_EQUALS',
    IN: 'IN',
}