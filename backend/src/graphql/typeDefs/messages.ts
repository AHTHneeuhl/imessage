import gql from "graphql-tag";

const typeDefs = gql`
  type Message {
    id: String
    sender: user
    body: String
    createdAt: Date
  }
`;

export default typeDefs;
