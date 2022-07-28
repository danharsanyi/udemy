import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const client = new ApolloClient({
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

const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobFields
    }
  }
  ${JOB_FRAGMENT}
`;

// Companies
export async function getCompany(id) {
  const query = gql`
    query GetCompany($id: ID!) {
      company(id: $id) {
        id name description
        jobs {
          id title description
        }
      }
    }
  `;

  const variables = {id};
  const { data: { company } } = await client.query({ query, variables });
  return company;
}

// Jobs
export async function getJobs() {
  const query = gql`
    query GetJobs {
      jobs {
        ...JobFields
      }
    }
    ${JOB_FRAGMENT}
  `;
  const { data: { jobs } } = await client.query({ query, fetchPolicy: 'network-only' });
  return jobs;
}

export async function getJob(id) {
  const variables = {id};
  const { data: { job } } = await client.query({ query: JOB_QUERY, variables });
  return job;
}

export async function createJob(input) {
  const mutation = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobFields
      }
    }
    ${JOB_FRAGMENT}
  `;

  const variables = {input};
  const context = {
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }
  const { data: { job } } = await client.mutate({
    mutation,
    variables,
    context,
    update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: JOB_QUERY,
        variables: { id: job.id },
        data: { job },
      })
    },
  });
  return job;
}
