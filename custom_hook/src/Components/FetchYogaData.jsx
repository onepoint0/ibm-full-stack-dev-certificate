import UseFetch from "./UseFetch"

const FetchYogaData = () => {
    const data = UseFetch('https://api.npoint.io/4459a9a10e43812e1152');
    console.log('yoga data = ', data);

    return (
        <>
            <h1>Yoga Poses</h1>
            <ul>
                {data && data.map((pose, idx) => (
                    <li key={idx} style={{listStyleType: "none", marginBottom: "40px"}}>
                        <h2>{pose.name}</h2>
                        <p><strong>Benefits:</strong>{pose.benefits}</p>
                        <p><strong>Duration: {pose.time_duration}</strong></p>
                    </li>
                ))}
            </ul>
        </>
    )
}
export default FetchYogaData