import axios from 'axios';
import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { toast } from 'react-toastify';

const PostJob = () => {
  const { userInfo, loading } = useGlobalContext();
  const navigate = useNavigate();
  const [position, setPosition] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [begin, setBegin] = React.useState('');
  const [end, setEnd] = React.useState('');

  if (loading) {
    return (
      <div className="div-center flex bg-dark text-white "> Loading... </div>
    );
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    // alert(JSON.parse(localStorage.getItem('userInfo')));
    try {
      // alert(userInfo._id);
      await axios.post('/api/v1/jobs/postjob', {
        function: position.toLowerCase(),
        company: company.toLowerCase(),
        started: begin,
        finished: end,
        createdBy: userInfo._id,
        name: userInfo.name,
      });
      navigate('/users/joblist');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="div-center flex bg-dark text-white ">
      {' '}
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel> Position </FormLabel>{' '}
          <FormControl
            type="text"
            required
            onChange={(e) => setPosition(e.target.value)}
          />{' '}
        </FormGroup>{' '}
        <FormGroup>
          <FormLabel> Company </FormLabel>{' '}
          <FormControl
            type="text"
            required
            onChange={(e) => setCompany(e.target.value)}
          />{' '}
        </FormGroup>{' '}
        <FormGroup>
          <FormLabel> Started </FormLabel>{' '}
          <FormControl type="text" onChange={(e) => setBegin(e.target.value)} />{' '}
        </FormGroup>{' '}
        <FormGroup>
          <FormLabel> Finished </FormLabel>{' '}
          <FormControl type="text" onChange={(e) => setEnd(e.target.value)} />{' '}
        </FormGroup>{' '}
        <div className="btn-container" style={{ width: '100%' }}>
          <Button type="submit" style={{ width: '100%' }}>
            Submit{' '}
          </Button>{' '}
        </div>{' '}
      </Form>{' '}
    </div>
  );
};

export default PostJob;
