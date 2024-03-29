import { useParams } from 'react-router';
import JobList from './JobList';
import {useCompany} from '../graphql/hooks';

function CompanyDetail() {
  const { companyId } = useParams();
  const { company, loading } = useCompany(companyId);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h5 className='title is-5'>
        Jobs at {company.name}
      </h5>
      <JobList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
