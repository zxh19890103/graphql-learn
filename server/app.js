const {
    ApolloServer,
    gql
} = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello: String!,
        increment(input: Int!): Int
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello',
        increment: (parent, { input }, context, info) => {
            return input + 1
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({
    port: 3000
}).then(({ url }) => {
    console.log(` rocket server ready at ${url} `)
})