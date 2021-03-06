import { gql } from '@apollo/client';

export const JOIN_CONFERENCE_MUTATION = gql`
mutation join($input: Attendee!) {
    join(input: $input)
},
`
export default JOIN_CONFERENCE_MUTATION