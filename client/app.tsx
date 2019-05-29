import { ApolloClient } from 'apollo-client'
import gql from 'graphql-tag'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Query, ApolloProvider } from 'react-apollo'

const httpLink = new HttpLink({
    uri: 'http://0.0.0.0:3000'
})

const errorLink = onError(data => {
    if (data.graphQLErrors && data.graphQLErrors.length > 0) {
        console.log(data.graphQLErrors)
    }
})

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
    connectToDevTools: true
})

const query = gql`
    query increment
    {
        increment(input: 1989),
        person {
            name,
            age
        }
    }
`

const App = () => {
    return <ApolloProvider client = {client}>
        <Query fetchPolicy="network-only" query={query}>
            {({ loading, error, data }) => {
                if (loading) return <em>Loading...</em>
                if (error) return <em>Error</em>
                const { increment, person } = data
                return <h3>Hello, My name is {person.name} and I'm {person.age}</h3>
            }}
        </Query>
    </ApolloProvider>
}

ReactDOM.render(<App/>, document.querySelector('#App'))