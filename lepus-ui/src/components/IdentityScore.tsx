import React from 'react';
import { ApolloClient, useQuery, NormalizedCacheObject, DocumentNode } from '@apollo/client';

interface Props {
    client: ApolloClient<NormalizedCacheObject>,
    id: string,
    query: DocumentNode,
}

export default function IdentityScore(props: Props) {
    const [message, setMessage] = React.useState('');
    const [score, setScore] = React.useState(0);

    const { loading, error, data } = useQuery(
        props.query,
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
