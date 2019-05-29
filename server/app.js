const {
    ApolloServer,
    gql
} = require('apollo-server')

const typeDefs = gql`
    type Person {
        name: String!,
        age: Int!
    }
    type Query {
        person: Person!,
        hello: String!,
        increment(input: Int!): Int
    }
`

const store = {
    Person: {
        name: () => 'Singhi',
        age: () => 30
    }
}

const resolvers = {
    Query: {
        hello: () => 'Hello',
        increment: (parent, { input }, context, info) => {
            return input + 1
        },
        person: () => {
            return store.Person
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