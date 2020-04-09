import { gql } from 'apollo-server-express'

export default gql`
    directive @auth on FIELD_DEFINITION
    directive @guest on FIELD_DEFINITION
    
    type Query{
        _empty: String
    }

    type Mutation{
        _empty: String
    }

    type Subscription{
        _empty: String
    }
`
