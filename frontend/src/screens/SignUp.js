import {
  Form,
  FormControl,
  FormLabel,
  Button,
  FormGroup,
} from 'react-bootstrap';

import React from 'react';
//import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('password does not match');
      return;
    }
    try {
      await axios.post('/api/v1/users/signup', {
        name,
        email,
        password,
      });
      navigate('/users/login');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="div-center flex text-white">
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel> Name </FormLabel>{' '}
          <FormControl type="text" onChange={(e) => setName(e.target.value)} />{' '}
        </FormGroup>{' '}
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
        <FormGroup>
          <FormLabel> Confirm Password </FormLabel>{' '}
          <FormControl
            type="password"
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />{' '}
        </FormGroup>{' '}
        <div className="btn-container" style={{ width: '100%' }}>
          <Button type="submit" style={{ width: '100%' }}>
            {' '}
            Sign Up{' '}
          </Button>{' '}
        </div>{' '}
      </Form>{' '}
    </div>
  );
};

export default SignUp;
