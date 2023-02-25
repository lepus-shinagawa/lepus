import React from 'react';
import { useQuery, gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import MetaMaskConnector from './MetaMaskConnector';
import IdentityScore from './IdentityScore';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import Grid from '@mui/material/Grid';
import Rank from './Rank';

const client = new ApolloClient({
    uri: import.meta.env.VITE_SUBQUERY_LEPUS_ENDPOINT,
    cache: new InMemoryCache(),
})

const ACCOUNT = gql`
    query Account($id: String!) {
        account2(id: $id) {
            id
            totalStaking
        }
    }
`;

const ACCOUNTS = gql`
    query Account($first: Int!, $offset: Int!){
        account2s(
            orderBy: TOTAL_STAKING_DESC, 
            first: $first,
            offset: $offset
        ) {
            nodes{
                id
                totalStaking
            }
        }
    }
`;

export default function StakingLeaderBoard() {
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
            <h2>Your scores</h2>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <MetaMaskConnector setAccounts={setAccounts}></MetaMaskConnector>
                    {accounts.map(account => {
                        return (
                            <IdentityScore
                                key={account}
                                client={client}
                                id={account}
                                query={ACCOUNT}
                            />
                        )
                    })}
                </Grid>
                <Grid item xs={6}>
                    <div>polkadot{'{.js}'}</div>
                    {polkadotAccounts.map(account => {
                        return (
                            <IdentityScore
                                key={account}
                                client={client}
                                id={account}
                                query={ACCOUNT}
                            />
                        )
                    })}
                </Grid>
            </Grid>

            <div style={{ padding: 20 }}></div>
            <h2>Leader board</h2>

            {Object.keys(data.account2s.nodes).map(i => {
                const account = data.account2s.nodes[i];
                return (
                    <div key={i}>
                        <Rank n={Number(i) + 1} />
                        <div>{account.id}</div>
                        <div>score: {account.totalStaking}</div>
                        <div style={{ padding: 20 }} />
                    </div >
                )
            })}
        </>);
}
