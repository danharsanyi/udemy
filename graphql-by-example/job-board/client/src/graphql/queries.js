import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { getAccessToken } from '../auth';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

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
        id title
        company {
          id name
        }
      }
    }
  `;
  const { data: { jobs } } = await client.query({ query });
  return jobs;
}

export async function getJob(id) {
  const query = gql`
    query GetJob($id: ID!) {
      job(id: $id) {
        id title description
        company {
          id name
        }
      }
    }
  `;

  const variables = {id};
  const { data: { job } } = await client.query({ query, variables });
  return job;
}

export async function createJob(input) {
  const mutation = gql`
    mutation CreateJobMutation($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id title
        company {
          id name
        }
      }
    }
  `;

  const variables = {input};
  const context = {
    headers: { 'Authorization': `Bearer ${getAccessToken()}` },
  }
  const { data: { job } } = await client.mutate({ mutation, variables, context });
  return job;
}
