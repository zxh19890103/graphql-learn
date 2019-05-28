const {
    ApolloServer,
    gql
} = require('apollo-server')

const typeDefs = gql`
    type Query {
        hello: String,
        world: String
    }
`

const resolvers = {
    Query: {
        hello: () => 'Hello',
        world: () => 'World'
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