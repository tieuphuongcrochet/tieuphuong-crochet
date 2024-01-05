import { Link } from "react-router-dom";
import { MENU_NAV, ROUTE_PATH } from "utils";
import { Breadcrumb } from "antd";
import { BreadCrumbItem, BreadcrumbProp } from "models";
import { useEffect, useState } from "react";
import './style.scss';
import breadcrumb_backgroud from 'assets/breadcrumbs/1.jpg';

const BreadCrumbs = ({ background, pathname = '' }: BreadcrumbProp) => {
	const initialCrumbs: BreadCrumbItem[] = [];
	const [crumbs, setCrumbs] = useState(initialCrumbs);

	useEffect(() => {
		const temp: BreadCrumbItem[] = pathname?.split('/')
			.map(crumb => {
				if (crumb === '') {
					return {
						path: ROUTE_PATH.HOME,
						title: 'home',
					}
				} else {
					const link = MENU_NAV.find(nav => nav.path.includes(crumb));
					return {
						path: link?.path || '',
						title: link?.name
					}
				}
			});
		setCrumbs(temp);
	}, [pathname])

	const itemRender = (route: any, params: any, items: any[], paths: string[]) => {
		const last = items.indexOf(route) === items.length - 1;
		return last ? <span>{route.title}</span> : <Link to={route.path}>{route.title}</Link>;
	};

	return (
		<div className="bread-crumbs-wrap"
			style={{ backgroundImage: `url(${background || breadcrumb_backgroud})` }}
		>
			<div className="container">
				<div className="bread-crumbs-title">
					<h3 className="title-page">{crumbs[crumbs.length - 1]?.title}</h3>
					<Breadcrumb
						items={[...crumbs]}
						itemRender={itemRender}
					/>
				</div>
			</div>
		</div>
	)
}

export default BreadCrumbs;

