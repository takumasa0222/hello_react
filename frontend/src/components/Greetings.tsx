import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Greetings() {
	const [message, setMessage] = useState<string | null>(null);
	// const [error, setError] = useState<any>(null);
	const id = 0;

	useEffect(() => {
		if (id == null) return;
	const fetchData = async () => {
		try {
			const res = await axios.get(`https://2q5iffjd6g.execute-api.ap-northeast-1.amazonaws.com/retrieveHelloDataFromDynamo?id=${id}`);
			setMessage(res.data);
		} catch (err) {
			console.error(err);
			// setError(err);
		}
	};

	fetchData();
	}, []);
	return (
	<div>
		{/* {error && <p style={{ color: 'red' }}>Error: {error.message}</p>} */}
		{message ? <h1>{message}</h1> : <p>Loading...</p>}
	</div>
	);
}
