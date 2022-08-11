import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useGlobalContext } from '../context';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

const EditJob = () => {
  const { userInfo } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  const [position, setPosition] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [started, setStarted] = React.useState('');
  const [finished, setFinished] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const [job, setJob] = React.useState({});

  const url = `/api/v1/jobs/getjob/job/${id}`;

  const fetchJob = useCallback(async () => {
    try {
      const fetched_job = await axios.get(url);
      setJob(fetched_job.data);
      setCompany(fetched_job.data.company);
      setPosition(fetched_job.data.function);
      setStarted(fetched_job.data.started);
      setFinished(fetched_job.data.finished);

      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  }, [url]);

  React.useEffect(() => {
    setLoading(true);

    fetchJob();
  }, [fetchJob]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const patch_url = `/api/v1/jobs/editjob/${job._id}`;

    const newJob = {
      function: position.toLowerCase(),
      company: company.toLowerCase(),
      started: started,
      finished: finished,
    };

    try {
      await axios.patch(patch_url, newJob);
      navigate('/users/joblist');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="div-center flex bg-dark text-white "> LOADING... </div>
    );
  }

  return (
    <div className="div-center flex bg-dark text-white ">
      {' '}
      {userInfo && <div> {userInfo.name} </div>} <h3> Edit Job </h3>{' '}
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel> Position </FormLabel>{' '}
          <FormControl
            type="text"
            onChange={(e) => setPosition(e.target.value)}
            value={position}
          />{' '}
        </FormGroup>{' '}
        <FormGroup>
          <FormLabel> Company </FormLabel>{' '}
          <FormControl
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />{' '}
        </FormGroup>{' '}
        <FormGroup>
          <FormLabel> Started </FormLabel>{' '}
          <FormControl
            type="text"
            onChange={(e) => setStarted(e.target.value)}
            value={started}
          />{' '}
        </FormGroup>{' '}
        <FormGroup>
          <FormLabel> Finished </FormLabel>{' '}
          <FormControl
            type="text"
            onChange={(e) => setFinished(e.target.value)}
            value={finished}
          />{' '}
        </FormGroup>{' '}
        <div className="btn-container" style={{ width: '100%' }}>
          <Button type="submit" style={{ width: '100%' }}>
            {' '}
            Submit{' '}
          </Button>{' '}
        </div>{' '}
      </Form>{' '}
    </div>
  );
};

export default EditJob;
