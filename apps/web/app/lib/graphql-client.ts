import { GraphQLClient } from 'graphql-request';

/**
 * @todo use env
 */
export const client = new GraphQLClient('http://localhost:3333/graphql');
