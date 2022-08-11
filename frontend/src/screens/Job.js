import { useNavigate } from 'react-router-dom';

const Job = (props) => {
  const navigate = useNavigate();

  const onclickHandler = () => {
    navigate(`/users/editjob/${props._id}`);
  };

  return (
    <div className="div-job-container" onClick={onclickHandler}>
      <div className="item-container">
        {' '}
        <span>
          <strong> Position: </strong>{' '}
        </span>{' '}
        <span className="right">{props.function} </span>
      </div>
      <div className="item-container">
        {' '}
        <span>
          {' '}
          <strong> Company: </strong>{' '}
        </span>{' '}
        <span className="right">{props.company} </span>{' '}
      </div>{' '}
      <div className="item-container">
        {' '}
        <span>
          {' '}
          <strong> Started: </strong>{' '}
        </span>{' '}
        <span className="right">{props.started}</span>{' '}
      </div>
      <div className="item-container">
        {' '}
        <span>
          {' '}
          <strong> Finished: </strong>{' '}
        </span>{' '}
        <span className="right">{props.finished}</span>{' '}
      </div>{' '}
    </div>
  );
};

export default Job;
