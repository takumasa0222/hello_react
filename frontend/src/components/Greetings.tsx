import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Greetings() {
	const [message, setMessage] = useState<string | null>(null);
	const id = 0;
	const apiUrl = '/message';

	useEffect(() => {
		if (id == null) return;
	const fetchData = async () => {
		try {
			const res = await axios.get(`${apiUrl}?lang=ja&type=default`);
			setMessage(res.data.message);
		} catch (err) {
			console.error(err);
		}
	};

	fetchData();
	}, [apiUrl]);
	return (
	<div>
		{message ? <h1>{message}</h1> : <p>Loading...</p>}
	</div>
	);
}
