import axios from 'axios';
import React from 'react';
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';

import { toast } from 'react-toastify';

const GetAnyJobs = () => {
  const [position, setPosition] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [jobs, setJobs] = React.useState(null);

  const setPositionHandler = React.useCallback(
    (e) => setPosition(e.target.value.toLowerCase()),
    []
  );

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const queryObject = { function: position.toLowerCase() };

      const search_jobs = await axios.get(
        `/api/v1/jobs/getjobs/${position}`,
        queryObject
      );

      setJobs(search_jobs.data);

      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const getusersjobsHandler = async (createdBy) => {
    setLoading(true);
    try {
      const usersjobs = await axios.get(
        `/api/v1/jobs/getjobs/getusersjobs/${createdBy}`,
        { createdBy }
      );

      setJobs(usersjobs.data);
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

  const Job = (props) => {
    return (
      <div
        className="div-job-container flex text-white "
        onClick={() => getusersjobsHandler(props.createdBy)}
      >
        <div className="item-container">
          {' '}
          <span>
            <strong> Name: </strong>{' '}
          </span>{' '}
          <span className="right"> {props.name} </span>{' '}
        </div>{' '}
        <div className="item-container">
          {' '}
          <span>
            <strong> Position: </strong>{' '}
          </span>{' '}
          <span className="right"> {props.function} </span>{' '}
        </div>{' '}
        <div className="item-container">
          {' '}
          <span>
            {' '}
            <strong> Company: </strong>{' '}
          </span>{' '}
          <span className="right"> {props.company} </span>{' '}
        </div>{' '}
        <div className="item-container">
          {' '}
          <span>
            {' '}
            <strong> Started: </strong>{' '}
          </span>{' '}
          <span className="right"> {props.started} </span>{' '}
        </div>{' '}
        <div className="item-container">
          {' '}
          <span>
            {' '}
            <strong> Finished: </strong>{' '}
          </span>{' '}
          <span className="right"> {props.finished} </span>{' '}
        </div>{' '}
      </div>
    );
  };

  let alljobs = [];
  if (jobs) {
    alljobs = jobs.map((job) => {
      return (
        <Job
          key={job._id}
          createdBy={job.createdBy}
          company={job.company}
          started={job.started}
          finished={job.finished}
          function={job.function}
          name={job.name}
        />
      );
    });
  }

  return (
    <div className="div-form-container flex text-white ">
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel> Position </FormLabel>{' '}
          <FormControl type="text" onChange={(e) => setPositionHandler(e)} />{' '}
        </FormGroup>{' '}
        <div className="btn-container" style={{ width: '100%' }}>
          <Button type="submit" style={{ width: '100%' }}>
            Search{' '}
          </Button>{' '}
        </div>{' '}
      </Form>
      {alljobs && <div className="job-listing"> {alljobs} </div>}{' '}
      {alljobs.length < 1 && <div> Nothing to display </div>}{' '}
    </div>
  );
};

export default GetAnyJobs;
