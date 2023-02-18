import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import MetaMaskConnector from './MetaMaskConnector';
import IdentityScore from './IdentityScore';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';

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
    const [accounts, setAccounts] = React.useState([] as string[]);
    const [polkadotAccounts, setPolkadotAccounts] =
        React.useState([] as string[]);

    const { loading, error, data } = useQuery(
        ACCOUNTS,
        {
            client: client,
            variables: { first, offset }
        }
    );

    React.useEffect(() => {
        (async () => {
            await web3Enable('my cool dapp');
            const allAccounts = await web3Accounts();
            setPolkadotAccounts(allAccounts.map(x => x.address));
        })()
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <>
            <MetaMaskConnector setAccounts={setAccounts}></MetaMaskConnector>
            {accounts.map(account => {
                return (
                    <IdentityScore
                        key={account}
                        client={client}
                        id={account}
                    />
                )
            })}

            <hr
                style={{
                    background: "#FFFFFF",
                    height: "2px",
                    border: "none",
                }}
            />

            <div>polkadot</div>
            {polkadotAccounts.map(account => {
                return (
                    <IdentityScore
                        key={account}
                        client={client}
                        id={account}
                    />
                )
            })}

            <hr
                style={{
                    background: "#FFFFFF",
                    height: "2px",
                    border: "none",
                }}
            />

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
