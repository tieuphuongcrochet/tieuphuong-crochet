
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

export const ROUTE_PATH = {
	HOME: '/',
	SHOP: '/shop',
	FREEPATTERNS: '/free-patterns',
	BLOG: '/blog',
	ABOUT: '/about',
	CONTACT: '/contact',
	LOGIN: '/login',
	ADMIN: '/admin'
};

export const MENU_NAV = [
	{ path: ROUTE_PATH.HOME, name: 'Home' },
	{ path: ROUTE_PATH.SHOP, name: 'Shop' },
	{ path: ROUTE_PATH.FREEPATTERNS, name: 'Free patterns' },
	{ path: ROUTE_PATH.BLOG, name: 'Blog' },
	{ path: ROUTE_PATH.ABOUT, name: 'About' },
	{ path: ROUTE_PATH.CONTACT, name: 'Contact' },
];

export const API_URL = {
	HOME: '/home',
	PRODUCT: '/product',
	PATTERN: '/pattern',
	PRODUCT_CATEGORY: '/product-category',
	FREE_PATTERN: '/free-pattern',
	BLOG: '/blog'
}
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
