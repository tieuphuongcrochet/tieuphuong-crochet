import { Button, Image } from "antd";
import { Banner } from "models/setting";
import { Link } from "react-router-dom";
import './style.scss';

interface BannerItemProps {
	banner: Banner,
	classNames?: string,
};

const BannerItem = ({ banner, classNames }: BannerItemProps) => {
	const { fileContent, title, content, url } = banner;
	return (
		<div className={`banner-item ${classNames ? classNames : ''}`}>
			{fileContent && <Image preview={false} src={fileContent} alt='Banner 1' />}
			<div className='banner-item__infor'>
				<h4 className='title'>
					{title}
				</h4>
				<h5 className='content'>{content}</h5>
				<Link to={url as string} ><Button className='btn-border' type='primary'>View Detail</Button></Link>
			</div>
		</div>
	)
};

export default BannerItem;
