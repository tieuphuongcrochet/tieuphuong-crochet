import React from 'react';
import { Col, Empty, Flex, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { map } from 'lodash';

import CardProduct from 'components/CardProduct';
import ReadMoreBtn from 'components/ReadMoreBtn';
import HeaderPart from './HeaderPart';

import { ROUTE_PATH } from 'utils/constant';
import { selectHomeProducts } from '../homeSlice';
import { useAppSelector } from 'app/hooks';

const ProductsNode = () => {

  const products = useAppSelector(selectHomeProducts);
  const navigate = useNavigate();

  const onViewProduct = (id) => {
    navigate(`${ROUTE_PATH.SHOP}/${ROUTE_PATH.DETAIL}/${id}`);
  };

  return (
    <div className="products">
      <HeaderPart
        titleId="home_product_title"
        descriptionId='home_product_description'
      />
      <Flex gap={48} vertical className="products-data">
        <Row gutter={[30, 50]}>
          {
            map(products, (product, index) =>
              <Col key={`product_${index}`} xs={12} sm={8} lg={6} >
                <CardProduct
                  product={product}
                  onReadDetail={() => onViewProduct(product.id || '')}
                />
              </Col>
            )
          }
        </Row>
      </Flex>
      {
        products?.length > 0 ?
          <div className='read-more'>
            <ReadMoreBtn path={ROUTE_PATH.SHOP} />
          </div> :
          <Empty
            imageStyle={{ height: 80 }}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
      }
    </div>
  );
};

export default ProductsNode;
