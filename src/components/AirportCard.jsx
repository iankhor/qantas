import React from 'react';
import { Card, Button } from 'semantic-ui-react';

const AirportCard = ({
  backOnClick,
  selectedAirport: {
    airportCode,
    airportName,
    country: { countryName },
    city: { cityName, timeZoneName }
  }
}) => (
  <Card.Group>
    <Card data-testid="airport-card">
      <Card.Content>
        <Card.Header>{airportName}</Card.Header>
        <Card.Meta>{airportCode}</Card.Meta>
        <Card.Description>
          <p>{`${cityName}, ${countryName}`}</p>
          <p>{`Timezone: ${timeZoneName}`}</p>
        </Card.Description>
        <Button data-testid="airport-card-back" onClick={backOnClick}>
          Back to airport list
        </Button>
      </Card.Content>
    </Card>
  </Card.Group>
);

export default AirportCard;
