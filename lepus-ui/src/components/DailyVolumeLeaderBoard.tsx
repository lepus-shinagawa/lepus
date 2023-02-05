import { useQuery, gql } from '@apollo/client'

export default function DailyVolumeLeaderBoard() {
    const query = gql`
        query {
            userDayDatas(
                orderBy: dailyVolumeUSD, 
                orderDirection: desc, 
                first: 3,
            ) {
                id
                userAddress
                dailyVolumeUSD
                dailyVolumeETH
            }
        }`
    const { loading, error, data } = useQuery(query);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    // データの中身を確認
    console.log(data);

    return (
        <>
            {Object.keys(data.userDayDatas).map(i => {
                const userDayData = data.userDayDatas[i];
                return (
                    <div key={i}>
                        <h3>No.{Number(i) + 1} userAddress: {userDayData.userAddress}</h3>
                        <div>id: {userDayData.id}</div>
                        <div>dailyVolumeUSD: {userDayData.dailyVolumeUSD}</div>
                        <br />
                    </div >
                )
            })}
        </>);
}
