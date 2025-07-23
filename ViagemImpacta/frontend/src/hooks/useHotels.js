import { useEffect, useState } from 'react';
import axios from 'axios';

export function useHotels(filters = {}) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let query = '';
    if (filters.stars) query += `stars/${filters.stars}`;
    else if (filters.amenities) query += `amenities?${filters.amenities}`;
    axios.get(`/api/hotels/${query}`)
      .then(res => setHotels(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]);

  return { hotels, loading, error };
}
