import React, { useState } from 'react';
import axios from 'axios';

const useFetchAirportDetails = ({ url = '' } = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState([]);

  const succeededFetch = data => {
    setData(data);
    setIsSuccess(true);
    setIsComplete(true);
    setIsLoading(false);
  };

  const failedFetch = () => {
    setIsError(true);
    setIsComplete(true);
    setIsLoading(false);
  };

  const fetch = async () => {
    setIsLoading(true);

    try {
      const { status, data } = await axios.get(url);

      status >= 200 && status < 300 && succeededFetch(data);
    } catch (e) {
      failedFetch();
    }
  };

  return [{ isLoading, isComplete, isSuccess, isError, data }, fetch];
};

export default useFetchAirportDetails;
