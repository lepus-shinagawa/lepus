import React from 'react';
import { ApolloClient, useQuery, gql, NormalizedCacheObject } from '@apollo/client';

interface Props {
    client: ApolloClient<NormalizedCacheObject>,
    id: string,
}

const ACCOUNT = gql`
    query Account($id: String!) {
        account(id: $id) {
            id
            nftForesightScore
        }
    }
`;

export default function IdentityScore(props: Props) {
    const [message, setMessage] = React.useState('');
    const [score, setScore] = React.useState(0);

    const { loading, error, data } = useQuery(
        ACCOUNT,
        {
            client: props.client,
            variables: { id: props.id }
        }
    );

    React.useEffect(() => {
        if (loading) setMessage('Loading...');
        else if (error) setMessage(`Error: ${error.message}`);
        else {
            setMessage('');
            if (data.account) setScore(data.account.nftForesightScore);
        }
    });

    return (
        <>
            <h4>{props.id}</h4>
            <div>{message}</div>
            <h2>Score: {score}</h2>
        </>
    );
}
