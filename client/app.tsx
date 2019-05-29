import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Query, ApolloProvider } from 'react-apollo'

import { increment } from './types/increment'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: 'http://0.0.0.0:3000'
    }),
    connectToDevTools: true
})

const query = gql`
    query increment
    {
        increment(input: 1989)
    }
`

const App = () => {
    return <ApolloProvider client = {client}>
        <Query fetchPolicy="network-only" query={query}>
            {({ loading, error, data }) => {
                if (loading) return <em>Loading...</em>
                if (error) return <em>Error</em>
                const typedData = data as increment
                return <h3>Hello, {typedData.increment}</h3>
            }}
        </Query>
    </ApolloProvider>
}

ReactDOM.render(<App/>, document.querySelector('#App'))