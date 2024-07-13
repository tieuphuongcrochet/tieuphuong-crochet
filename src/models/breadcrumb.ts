import { ReactNode } from "react";

export interface BreadCrumbItem {
	path: string;
	title: string | ReactNode
};

export interface BreadcrumbProp {
	background?: string;
	pathname: string;
}
