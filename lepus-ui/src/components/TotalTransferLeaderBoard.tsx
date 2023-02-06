import { useQuery, gql } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://api.subquery.network/sq/shinji19/lepus',
    cache: new InMemoryCache(),
})

const query = gql`
        query {
            accounts(
                orderBy: TOTAL_TRANSFER_AMOUNT_DESC, 
                first: 3,
            ) {
                nodes{
                    id
                    totalTransferAmount
                }
            }
        }`

export default function TotalTransferLeaderBoad() {
    const { loading, error, data } = useQuery(query, { client: client });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    // データの中身を確認
    console.log(data);

    return (
        <>
            {Object.keys(data.accounts.nodes).map(i => {
                const account = data.accounts.nodes[i];
                return (
                    <div key={i}>
                        <h3>No.{Number(i) + 1} userAddress: {account.id}</h3>
                        <div>totalTransferAmount: {account.totalTransferAmount}</div>
                        <br />
                    </div >
                )
            })}
        </>);
}
