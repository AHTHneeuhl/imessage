import merge from "lodash.merge";

import userResolvers from "./user";
import conversationResolvers from "./conversation";
import messageResolvers from "./messages";
import scalarResolvers from "./scalars";

const resolvers = merge(
  {},
  userResolvers,
  conversationResolvers,
  messageResolvers,
  scalarResolvers
);

export default resolvers;
