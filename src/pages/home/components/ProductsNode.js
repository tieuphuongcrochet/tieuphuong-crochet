import React from 'react';
import { Col, Flex, Row } from 'antd';

import CardProduct from '../../../components/CardProduct';
import ReadMoreBtn from '../../../components/ReadMoreBtn';
import HeaderPart from './HeaderPart';

import { ROUTE_PATH } from '../../../utils/constant';
import product2 from '../../../assets/products/pd3.jpg';
import product3 from '../../../assets/products/pd1.jpg';
import product4 from '../../../assets/products/pd6.jpg';
import productbig from '../../../assets/products/pd10.jpg';
import productbig2 from '../../../assets/products/34.png';
import { selectHomeProducts } from '../homeSlice';
import { useAppSelector } from 'app/hooks';
import { useNavigate } from 'react-router-dom';

const ProductsNode = () => {
  //   const products = [
  //     { src: productbig2, title: 'Hoa hồng vàng', price: 200000 },
  //     { src: product2, title: 'Hoa đầu thú', price: 60000 },
  // 	{ src: product3, title: 'Hoa đầu thú', price: 60000 },
  // 	{ src: product4, title: 'Hoa sắc màu', price: 80000 },
  // 	{ src: productbig, title: 'Hoa hồng vàng', price: 200000 },
  //   ];

  const products = useAppSelector(selectHomeProducts);
  const navigate = useNavigate();

  const onViewProduct = (id) => {
    navigate(`${ROUTE_PATH.SHOP}/${ROUTE_PATH.DETAIL}/${id}`);
  };

  //   return (
  //     <div className="products">
  //       <HeaderPart title="Products" />
  //       <Flex gap={48} vertical className="products-data">
  //         {/* <Row gutter={[24, 24]} className="row-data">
  // 					<Col className="product-bigbox" xs={24} md={12} >
  // 						<CardProduct src={productbig2} title='Hoa hồng vàng' price={200000}/>
  // 					</Col>
  // 					<Col xs={24} md={12}>
  // 						<Row gutter={[24, 48]}>
  // 						<Col xs={24} md={12}>
  // 								<CardProduct title='Hoa đầu thú' price={60000} />
  // 							</Col>
  // 							<Col xs={24} md={12}>
  // 								<CardProduct src={product2} title='Hoa đầu thú' price={60000} />
  // 							</Col>
  // 							<Col xs={24} md={12}>
  // 								<CardProduct src={product3} title='Hoa đầu thú' price={60000} />
  // 							</Col>
  // 							<Col xs={24} md={12}>
  // 								<CardProduct src={product4} title='Hoa sắc màu' price={80000} />
  // 							</Col>
  // 						</Row>
  // 					</Col>
  // 				</Row> */}
  //         <Row gutter={[24, 24]}>
  //           <Col className="product-bigbox" xs={20} md={12}>
  //             <CardProduct src={productbig2} title="Hoa hồng vàng" price={200000} />
  //           </Col>
  //           <Col xs={24} md={12}>
  //             <Row gutter={[24, 48]}>
  //               <Col xs={20} md={12}>
  //                 <CardProduct title="Hoa đầu thú" price={60000} />
  //               </Col>
  //               <Col xs={20} md={12}>
  //                 <CardProduct src={product2} title="Hoa đầu thú" price={60000} />
  //               </Col>
  //               <Col xs={20} md={12}>
  //                 <CardProduct src={product3} title="Hoa đầu thú" price={60000} />
  //               </Col>
  //               <Col xs={20} md={12}>
  //                 <CardProduct src={product4} title="Hoa sắc màu" price={80000} />
  //               </Col>
  //             </Row>
  //           </Col>
  //         </Row>
  //         <Row gutter={[24, 24]}>
  //           <Col xs={24} md={12}>
  //             <Row gutter={[24, 48]}>
  //               <Col xs={20} md={12}>
  //                 <CardProduct title="Hoa đầu thú" price={60000} />
  //               </Col>
  //               <Col xs={20} md={12}>
  //                 <CardProduct src={product2} title="Hoa đầu thú" price={60000} />
  //               </Col>
  //               <Col xs={20} md={12}>
  //                 <CardProduct src={product3} title="Hoa đầu thú" price={60000} />
  //               </Col>
  //               <Col xs={20} md={12}>
  //                 <CardProduct src={product4} title="Hoa sắc màu" price={80000} />
  //               </Col>
  //             </Row>
  //           </Col>
  //           <Col className="product-bigbox" xs={20} md={12}>
  //             <CardProduct src={productbig2} title="Hoa hồng vàng" price={200000} />
  //           </Col>
  //         </Row>
  //         <div className="read-more">
  //           <ReadMoreBtn path={ROUTE_PATH.SHOP} />
  //         </div>
  //       </Flex>
  //     </div>
  //   );
  // };

  return (
    <div className="products">
      <HeaderPart title="Products" />
      <Flex gap={48} vertical className="products-data">
        <Row gutter={[24, 24]}>
          {products.map((product, index) => (
            <Col className="product-bigbox" xs={20} md={12} key={index}>
              <CardProduct
                src={product.src}
                title={product.name}
                price={product.price}
                currency={product.currency_code}
                onReadDetail={() => onViewProduct(product.id || '')}
              />
            </Col>
          ))}
        </Row>
      </Flex>
			<div className='read-more'><ReadMoreBtn path={ROUTE_PATH.SHOP} /></div>
    </div>
  );
};

export default ProductsNode;
