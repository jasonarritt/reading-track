const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  // Query resolvers
  Query: {
    // Me query
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");
      }
      throw new AuthenticationError("Not logged in!");
    },
    // Users query
    users: async () => {
      return User.find({}).select("-__v -password").populate("savedBooks");
    },
    // User query
    user: async (parent, args) => {
      return User.findOne({
        args,
      })
        .select("-__v -password")
        .populate("savedBooks");
    },
  },

  // Mutation resolvers
  Mutation: {
    // Add user mutation
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    // Login mutation
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    // Save book mutation
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          {
            new: true,
            runValidators: true,
          }
        );

        return user;
      }

      throw new AuthenticationError("Not logged in!");
    },
    // Remove book mutation
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: { savedBooks: { bookId } },
          },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("Not logged in!");
    },
  },
};

module.exports = resolvers;
