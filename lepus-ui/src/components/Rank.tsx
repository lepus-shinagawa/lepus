interface Props {
    n: number
}

export default function Rank(props: Props) {
    if (props.n == 1) return <div>🥇</div>
    if (props.n == 2) return <div>🥈</div>
    if (props.n == 3) return <div>🥉</div>
    return <div>No. {props.n}</div>
}
