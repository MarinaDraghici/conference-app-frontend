import { gql } from '@apollo/client';

const WITHDRAW_CONFERENCE_MUTATION = gql`
mutation withdraw($input: Attendee!) {
    withdraw(input: $input)
}
`
export default WITHDRAW_CONFERENCE_MUTATION