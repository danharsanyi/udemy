import JobList from './JobList';
import { useJobs } from '../graphql/hooks';

function JobBoard() {
  const {jobs, loading, error} = useJobs();

  if (loading) {
    return <p>Loading...</p>
  }

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
