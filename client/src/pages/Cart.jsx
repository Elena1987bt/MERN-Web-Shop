import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { clearCart } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === 'filled' && 'none'};
  background-color: ${(props) =>
    props.type === 'filled' ? 'black' : 'transparent'};
  color: ${(props) => props.type === 'filled' && 'white'};
`;

const TopTexts = styled.div`
  ${mobile({ display: 'none' })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;
const ProductAmountTitle = styled.span`
  margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  // margin: 5px;
  ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: '20px' })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Remove = styled.span`
  color: red;
  margin-right: 20px;
  cursor: pointer;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const products = cart.products;
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();
  const KEY = process.env.REACT_APP_STRIPE;
  const currentUser = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(clearCart());
  };
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makePayment = async () => {
      try {
        const res = await axios.post(
          'http://127.0.0.1:5000/api/checkout/payment',
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          }
        );
        history.push('/success', {
          stripeData: res.data,
          products: cart,
        });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makePayment();
  }, [stripeToken, cart.total, cart, history]);
  return (
    <Container>
      <Wrapper>
        <Title>
          {products.length > 0 ? 'YOUR BAG' : 'Your bag is currently empty!'}
        </Title>
        <Top>
          <Link to="/productList/women" className="link">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag{products.length}</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>

          <TopButton type="filled">
            {currentUser ? 'CHECKOUT NOW ' : 'LOG IN TO PROCEED ...'}
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />;
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmountTitle>Amount</ProductAmountTitle>
                    <ProductAmount>{product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            {currentUser ? (
              <StripeCheckout
                name="Web Shop"
                image="data:image/png;base64,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"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                stripeKey={KEY}
                token={onToken}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            ) : (
              <Button>Log in to make an order</Button>
            )}
            <Button onClick={handleDelete}>CLEAR CART</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;
