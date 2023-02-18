import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: import.meta.env.VITE_SUBQUERY_LEPUS_ENDPOINT,
    cache: new InMemoryCache(),
})

const ACCOUNTS = gql`
    query Account($first: Int!, $offset: Int!){
        accounts(
            orderBy: NFT_FORESIGHT_SCORE_DESC, 
            first: $first,
            offset: $offset
        ) {
            nodes{
                id
                nftForesightScore
            }
        }
    }
`;

export default function NFTForesightLeaderBoad() {
    const first = 10;
    const [offset, setOffset] = React.useState(0);

    const { loading, error, data } = useQuery(
        ACCOUNTS,
        {
            client: client,
            variables: { first, offset }
        }
    );
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            {Object.keys(data.accounts.nodes).map(i => {
                const account = data.accounts.nodes[i];
                return (
                    <div key={i}>
                        <h3>No.{Number(i) + 1} userAddress: {account.id}</h3>
                        <div>nftForesightScore: {account.nftForesightScore}</div>
                        <br />
                    </div >
                )
            })}
        </>);
}