
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

export const ROLES = {
	ADMIN: 'ADMIN',
	USER: 'USER'
}

export const LOCAL_STORAGE_NAMES = {
  SYSTEM_AUTHORITY: 'system-authority',
	ACCESS_TOKEN: 'accessToken'
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
	ADMIN_POSTS: '/admin/blog',
	ADMIN_CATEGORY: '/admin/category'
};

export const MENU_NAV = [
	{ path: ROUTE_PATH.HOME, name: 'Home' },
	{ path: ROUTE_PATH.SHOP, name: 'Shop' },
	{ path: ROUTE_PATH.FREEPATTERNS, name: 'Free patterns' },
	{ path: ROUTE_PATH.BLOG, name: 'Blog' },
	{ path: ROUTE_PATH.ABOUT, name: 'About' },
	{ path: ROUTE_PATH.CONTACT, name: 'Contact' },
];

export const REGEX = {
  PHONE_NUMBER: /^(0|\+?84)\d{9}$/,
  // eslint-disable-next-line no-control-regex
  EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  EMAIL_AIA: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@aia\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  IDENTIFY: /^[0-9]{9}$/,
  POLICY_NUMBER: /^[a-zA-Z]{1}[0-9]{9}$/,
  BILLING: /^[0-9]{7}$/,
  NUMBER: /^\d+$/,
  FW_POLNUM: /^[C|U][0-9]{9}$/,
  VN_TEXT_ONLY: /^[a-zA-Z 0-9\.\,\+\-\;\&\_\\\)\(\/\" a|à|á|ạ|ả|ã â|ầ|ấ|ậ|ẩ|ẫ ă|ằ|ắ|ặ|ẳ|ẵ đ e|è|é|ẹ|ẻ|ẽ ê|ề|ế|ệ|ể|ễ i|ì|í|ị|ỉ|ĩ o|ò|ó|ọ|ỏ|õ ô|ồ|ố|ộ|ổ|ỗ ơ|ờ|ớ|ợ|ở|ỡ u|ù|ú|ụ|ủ|ũ ư|ừ|ứ|ự|ử|ữ y|ỳ|ý|ỵ|ỷ|ỹ]*$/,
  ID_NO: /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
  VN_NAME: /^[a-zA-Z0-9 aàáạảã âầấậẩẫ ăằắặẳẵ đ eèéẹẻẽ êềếệểễ iìíịỉĩ oòóọỏõ ôồốộổỗ ơờớợởỡ uùúụủũ ưừứựửữ yỳýỵỷỹ]*$/i,
  MULTI_EMAIL: /^([A-Za-z0-9\.|-|_]*[@]{1}[A-Za-z0-9\.|-|_]*[.]{1}[a-z]{2,5})(;[A-Za-z0-9\.|-|_]*[@]{1}[A-Za-z0-9\.|-|_]*[.]{1}[a-z]{2,5})*?$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*\-_!+=\[\]{}|\\:',.?/`~"();])(?!.*@\.)[A-Za-z\d@#$%^&*\-_!+=\[\]{}|\\:',.?/`~"();]{8,}$/,
  USERNAME: /^(\d|\w)+$/
};

export const MOCK_FREE_PATTERNS = [
	{
		id: '1',
		src: pattern1,
		author: 'Tiểu Phương',
		name: 'Mặt trời ú'
	},
	{
		id: '1',
		src: pattern2,
		author: 'Susan family',
		name: 'Gối hoa'
	},
	{
		id: '1',
		src: pattern3,
		author: 'Vô danh',
		name: 'Túi gấu nhỏ'
	},
	{
		id: '1',
		src: pattern4,
		author: 'Tiểu Vũ',
		name: 'Búp bê'
	},
	{
		id: '1',
		src: pattern5,
		author: 'Vô sắc',
		name: 'Cây thông noel'
	},
	{
		id: '1',
		src: pattern6,
		author: 'Sưu tầm',
		name: 'Đầu cừu'
	},
	{
		id: '1',
		src: pattern7,
		author: 'Sưu tầm',
		name: 'Thú nhỏ'
	},
	{
		id: '1',
		src: pattern8,
		author: 'Sưu tầm',
		name: 'Kẹo hồ lô'
	},
];

export const SOCIALS = [
	{ social: 'Shopee', src: shopee, url: 'https://shopee.vn/littlegirl.crochet', textColor: '#fa5330' },
	{ social: 'Facebook', textColor: '#0866ff' },
	{ social: 'Instagram', textColor: '#e42a81', url: 'https://www.instagram.com/little_girl.crochet/' },
	{ social: 'Tiktok', url: 'https://www.tiktok.com/@tiemlentieuconuong' },
];

export const FOOTER_LINK = [
	{name: 'Home', path: ROUTE_PATH.HOME},
	{name: 'Shop', path: ROUTE_PATH.SHOP},
	{name: 'Patterns', path: ROUTE_PATH.FREEPATTERNS},
	{name: 'Blog', path: ROUTE_PATH.BLOG},
	{name: 'About', path: ROUTE_PATH.ABOUT},
	{name: 'Contact', path: ROUTE_PATH.CONTACT},
];

export const MOCK_BLOGS = [
	{src: banner2, name: 'Các ký hiệu trong chart móc len', description: 'Aypi non habent claritatem  insitam. Aypi non habent claritatem  insitam.'},
	{src: banner3, name: 'Các ký hiệu trong chart móc len', description: 'Aypi non habent claritatem  insitam. Aypi non habent claritatem  insitam. '},
	{src: banner4, name: 'Các ký hiệu trong chart móc len', description: 'Aypi non habent claritatem  insitam. Aypi non habent claritatem  insitam. '},
];
