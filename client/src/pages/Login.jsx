import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
  height: calc(100vh - 90px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Span = styled.span`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emptyFields, setEmptyFields] = useState(false);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);

  const handleClick = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setEmptyFields(true);
      return;
    }
    login(dispatch, { email, password });
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setEmptyFields(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [emptyFields]);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        {emptyFields && <Error>Please fill all the fields!</Error>}
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>LOGIN</Button>
          {error.err && <Error>{error.message}</Error>}
          <Span>DO NOT YOU REMEMBER THE PASSWORD?</Span>
          <Link to="/register" className="link">
            <Span>CREATE A NEW ACCOUNT</Span>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
