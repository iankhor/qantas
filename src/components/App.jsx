import React, { useEffect } from 'react';
import useFetchAirportDetails from 'hooks/useFetchAirportDetails';
import { Dimmer, Loader, Image, Segment, Container } from 'semantic-ui-react';

const App = ({ url }) => {
  const [{ isLoading, isComplete, isSuccess, isError, data }, fetch] = useFetchAirportDetails({ url });

  useEffect(() => {
    fetch({ url });
  }, []);

  return (
    <Container text>
      <Segment placeholder={isLoading}>
        <Dimmer active={isLoading}>{isLoading && <Loader indeterminate>Loading...</Loader>}</Dimmer>
        {isComplete && isSuccess && data.length > 0 && data[0].airportCode}
      </Segment>
    </Container>
  );
};

export default App;
