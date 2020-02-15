import React, { useState } from 'react';

const useFetchAirportDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  return [{ isLoading, isComplete, isSuccess, isError }];
};

export default useFetchAirportDetails;
