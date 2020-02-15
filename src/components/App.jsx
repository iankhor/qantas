import React, { useEffect } from 'react';
import useFetchAirportDetails from 'hooks/useFetchAirportDetails';
import { Dimmer, Loader, List, Segment, Container } from 'semantic-ui-react';

const App = ({ url }) => {
  const [{ isLoading, isComplete, isSuccess, isError, data }, fetch] = useFetchAirportDetails({ url });

  useEffect(() => {
    fetch({ url });
  }, []);

  return (
    <Container text>
      <Segment placeholder={isLoading}>
        <Dimmer active={isLoading}>{isLoading && <Loader indeterminate>Loading...</Loader>}</Dimmer>
        <List data-testid="airport-list" divided verticalAlign="middle">
          {data.map(({ airportCode, airportName, country: { countryName } }) => {
            return (
              <List.Item data-testid="airport-list-item" key={airportCode}>
                <List.Content data-testid="airport-name">{airportName}</List.Content>
                <List.Content data-testid="airport-country">{countryName}</List.Content>
              </List.Item>
            );
          })}
        </List>
      </Segment>
    </Container>
  );
};

export default App;
