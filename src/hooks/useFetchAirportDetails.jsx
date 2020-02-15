import React, { useState } from 'react';
import axios from 'axios';

const useFetchAirportDetails = ({ url = '' } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const fetch = async () => {
    setIsLoading(true);

    const { status, data } = await axios.get(url);

    if (status === 200) {
      setData(data);
      setIsSuccess(true);
      setIsComplete(true);
      setIsLoading(false);
    }
  };

  return [{ isLoading, isComplete, isSuccess, isError, data }, fetch];
};

export default useFetchAirportDetails;
