import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Greetings() {
	const [message, setMessage] = useState<string | null>(null);
	// const [error, setError] = useState<any>(null);
	const id = 0;
	const apiUrl = process.env.REACT_APP_API_URL;

	useEffect(() => {
		if (id == null) return;
	const fetchData = async () => {
		try {
			const res = await axios.get(`${apiUrl}?lang=ja&type=default`);
			setMessage(res.data.message);
		} catch (err) {
			console.error(err);
			// setError(err);
		}
	};

	fetchData();
	}, [apiUrl]);
	return (
	<div>
		{/* {error && <p style={{ color: 'red' }}>Error: {error.message}</p>} */}
		{message ? <h1>{message}</h1> : <p>Loading...</p>}
	</div>
	);
}
