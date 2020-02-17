import React, { Fragment, useEffect, useState } from 'react';
import useFetchAirportDetails from 'hooks/useFetchAirportDetails';
import usePaginator from 'hooks/usePaginator';
import { Pagination, Dimmer, Loader, List, Segment, Container, Card, Button } from 'semantic-ui-react';

const ListContainer = ({ airports, airportOnClick, isSuccess }) =>
  isSuccess && (
    <List data-testid="airport-list" divided verticalAlign="middle">
      {airports.map(({ airportCode, airportName, country: { countryName } }) => {
        return (
          <List.Item data-airportcode={airportCode} data-testid="airport-list-item" key={airportCode} onClick={airportOnClick}>
            <List.Content data-airportcode={airportCode} data-testid="airport-name">
              {airportName}
            </List.Content>
            <List.Content data-airportcode={airportCode} data-testid="airport-country">
              {countryName}
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );

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

const App = ({ url }) => {
  const [{ isLoading, isComplete, isSuccess, isError, data }, fetch] = useFetchAirportDetails({ url });
  const [{ paginatedList, totalPages }, paginate] = usePaginator();
  const [isViewingAirport, setIsViewAirport] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isSuccess) {
      paginate({ list: data });
    }
  }, [data, isSuccess]);

  const airportOnClick = ({ target: { dataset } }) => {
    const airport = data.find(({ airportCode }) => airportCode === dataset.airportcode);

    setSelectedAirport(airport);
    setIsViewAirport(true);
  };
  const backOnClick = () => setIsViewAirport(false);

  const pageChange = (e, { activePage }) => {
    setCurrentPage(activePage);
    paginate({ list: data, pageNumber: activePage });
  };

  useEffect(() => {
    fetch({ url });
  }, []);

  return (
    <Container text>
      <Segment placeholder={isLoading}>
        <Dimmer active={isLoading}>{isLoading && <Loader indeterminate>Loading...</Loader>}</Dimmer>
        {isError && <Segment>Something went wrong! Please try again</Segment>}
        {isViewingAirport ? (
          <AirportCard backOnClick={backOnClick} selectedAirport={selectedAirport} />
        ) : (
          <Fragment>
            <ListContainer airports={paginatedList} airportOnClick={airportOnClick} isSuccess={isSuccess} />
            <Pagination data-testid="pagination" activePage={currentPage} totalPages={totalPages} onPageChange={pageChange} />
          </Fragment>
        )}
      </Segment>
    </Container>
  );
};

export default App;
