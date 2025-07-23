import { useEffect, useState } from 'react';
import axios from 'axios';

export function useHotelDetails(hotelId) {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hotelId) return;
    setLoading(true);
    axios.get(`/api/hotels/${hotelId}`)
      .then(res => setHotel(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [hotelId]);

  return { hotel, loading, error };
}
