import { Col, Divider, Flex, Row, Space, Watermark, Image } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import DownloadImage from 'components/DownloadImage';
import IntroductionCard from 'components/IntroductionCard';
import { map } from 'lodash';
import { Product } from 'models';
import { productAction, selectProduct } from 'saga/product/productSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import logo from 'assets/logo.png';

const ProductDetail = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const product: Product = useAppSelector(selectProduct);
    console.log('product', product);

    useEffect(() => {
        if (id) {
            dispatch(productAction.fetchProduct(id));
        }
    }, [dispatch, id]);

    return (
        <Space direction="vertical" size={60}  style={{width: '100%'}} className="product-detail mt-content">
            {/* Introducing the product */}
            <IntroductionCard data={product} />
            <Divider />

            {/* Chart detail */}
            <Watermark
                content={['小方', 'Tiểu Phương Crochet']}
            >
                <div className="product-detail-content">
                    <h1 className="flex justify-center">Hình ảnh sản phẩm</h1>
                    <Image.PreviewGroup
                        fallback={logo}
                    >
                        <Flex className="image-detail" justify='center' wrap="wrap" gap={24}>
                            <Row gutter={12}>
                                {
                                    product.images && map(product.images, (image, index) => (
                                        <Col md={12} >
                                            <DownloadImage
                                                key={`product_${index}`}
                                                src={image.fileContent} />
                                        </Col>
                                    )
                                    )
                                }
                            </Row>
                        </Flex>
                    </Image.PreviewGroup>
                </div>
            </Watermark>
        </Space>
    )
}

export default ProductDetail;