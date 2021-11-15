import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/apiCalls';
import styled from 'styled-components';

import { mobile } from '../responsive';

const Container = styled.div`
  height: calc(100vh - 90px);
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;
const Error = styled.span`
  color: red;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-right: 15px;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [emptyFields, setEmptyFields] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (Object.keys(inputs).length < 5) {
      setEmptyFields(true);
      return;
    }
    register(dispatch, inputs);
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
        <Title>CREATE AN ACCOUNT</Title>
        {emptyFields && <Error>Please fill all the fields!</Error>}
        <Form>
          <Input
            placeholder="name"
            name="name"
            type="text"
            onChange={handleChange}
          />
          <Input
            placeholder="last name"
            name="last name"
            type="text"
            onChange={handleChange}
          />
          <Input
            placeholder="username"
            name="username"
            type="text"
            onChange={handleChange}
          />
          <Input
            placeholder="email"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
