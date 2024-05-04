import { Alert, Divider, Space } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Product } from 'models';
import IntroductionCard from 'components/IntroductionCard';
import { productAction, selectProduct } from 'saga/product/productSlice';
import ViewImagesList from 'components/ViewImagesList';

const ProductDetail = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const product: Product = useAppSelector(selectProduct);

    useEffect(() => {
        if (id) {
            dispatch(productAction.fetchProduct(id));
        }
    }, [dispatch, id]);

    return (
        <Space direction="vertical" size={40} style={{ width: '100%' }} className="product-detail">
            <Alert showIcon type="info" message={<FormattedMessage id="product_note" />} />

            {/* Introducing the product */}
            <IntroductionCard isPreviewAvatar={false} data={product} />
            <Divider />
            <ViewImagesList
                images={product.images}
                name='product'
                detailId='product_detail.detail'
                content={product.content}
            />
        </Space>
    )
}

export default ProductDetail;