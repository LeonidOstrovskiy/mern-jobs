import React from 'react';
import { useGlobalContext } from '../context';
import axios from 'axios';
import Job from './Job';
import { toast } from 'react-toastify';

const JobList = () => {
  const { userInfo } = useGlobalContext();

  const [loading, setLoading] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    const findJobs = async () => {
      setLoading(true);
      try {
        const users_jobs = await axios.get(
          `/api/v1/jobs/getjob/${userInfo._id}`
        );
        //alert('hi');
        //console.log(users_jobs);
        setJobs(users_jobs.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
      //alert(jobToFind.position);
    };
    findJobs();
  }, [setLoading, userInfo._id]);

  const joblist = jobs.map((job) => (
    <Job
      key={job._id}
      _id={job._id}
      function={job.function}
      company={job.company}
      started={job.started}
      finished={job.finished}
    />
  ));

  if (loading) {
    return <div className="div-center flex bg-dark text-white">LOADING...</div>;
  }

  return (
    <div className="div-center flex bg-dark text-white ">
      <h3> {`${userInfo.name}'s Job List`}</h3>
      {joblist}
    </div>
  );
};

export default JobList;
