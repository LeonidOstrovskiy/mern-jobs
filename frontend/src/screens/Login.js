import {
  Form,
  FormControl,
  FormLabel,
  Button,
  FormGroup,
} from 'react-bootstrap';

import React from 'react';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = React.useState('');
  //const [name, setName] = React.useState('');
  let name = '';
  const [password, setPassword] = React.useState('');

  const { setUserInfo, setLoading, loading } = useGlobalContext();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/v1/users/login', {
        name,
        email,
        password,
      });
      const user = await axios.get(`/api/v1/users/login/${email}`);

      setUserInfo({
        name: user.data.name,

        email: email,
        password: password,
        _id: user.data._id,
      });

      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          name: user.data.name,
          email: email,
          _id: user.data._id,
        })
      );

      navigate('/users/joblist');
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="div-center flex text-white bg-ground "> LOADING... </div>
    );
  }

  return (
    <div className="div-center flex text-white ">
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel> Email </FormLabel>{' '}
          <FormControl
            type="email"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />{' '}
        </FormGroup>{' '}
        <FormGroup>
          <FormLabel> Password </FormLabel>{' '}
          <FormControl
            type="password"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />{' '}
        </FormGroup>{' '}
        <div className="btn-container" style={{ width: '100%' }}>
          <Button type="submit" style={{ width: '100%' }}>
            Login{' '}
          </Button>{' '}
        </div>{' '}
      </Form>{' '}
    </div>
  );
};

export default Login;
