import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

const JOB_FRAGMENT = gql`
  fragment JobFields on Job {
    id title description
    company {
      id name
    }
  }
`;

export const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobFields
    }
  }
  ${JOB_FRAGMENT}
`;

export const JOBS_QUERY = gql`
  query GetJobs {
    jobs {
      ...JobFields
    }
  }
  ${JOB_FRAGMENT}
`;

// Companies

export const COMPANY_QUERY = gql`
  query GetCompany($id: ID!) {
    company(id: $id) {
      id name description
      jobs {
        id title description
      }
    }
  }
`;

export const CREATE_JOB_MUTATION = gql`
  mutation CreateJobMutation($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobFields
    }
  }
  ${JOB_FRAGMENT}
`;
