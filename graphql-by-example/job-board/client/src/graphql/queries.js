import { request, gql } from 'graphql-request';

const GRAPHQL_URL = 'http://localhost:9000/graphql';

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
  const { company } = await request(GRAPHQL_URL, query, variables);
  return company;
}

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id title
        company {
          id name
        }
      }
    }
  `;

  const { jobs } = await request(GRAPHQL_URL, query);
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
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
}
