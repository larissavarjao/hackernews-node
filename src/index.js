const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of Hackernews Clone.`,
    feed: () => links
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      let link = links.find(item => item.id === args.id);
      link.id = args.id;
      link.description = args.description;
      link.url = args.url;
      return link;
    },
    deleteLink: (root, args) => {
      links.filter(item => item.id !== args.id);
      return links;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`Server is running on httl://localhost:4000`));
