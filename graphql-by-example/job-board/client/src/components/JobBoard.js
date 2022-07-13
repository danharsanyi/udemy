import { useEffect, useState } from 'react';
import JobList from './JobList';
import { getJobs } from '../graphql/queries';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      { error ?
        <p>{error}</p> :
        <JobList jobs={jobs} />
      }
    </div>
  );
}

export default JobBoard;
