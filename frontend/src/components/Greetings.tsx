import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Greetings() {
	const [message, setMessage] = useState<string | null>(null);
	const apiUrl = '/message';

	useEffect(() => {
	const fetchData = async () => {
		try {
				console.log(apiUrl);
				const res = await axios.get(`${apiUrl}?lang=ja&type=default`);
			if (res.data?.message) {
				setMessage(res.data.message);
			} else {
				console.warn("message field not found in response:", res.data);
			}
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
