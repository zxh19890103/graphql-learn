import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://0.0.0.0:3000'
    }),
    connectToDevTools: true
})

client.query(
    {
        query: gql`
        {
            hello
        }
        `,
    }
).then(r => {
    console.log(r)
}, err => {
    console.log(err)
})