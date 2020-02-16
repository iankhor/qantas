import React, { Fragment, useEffect, useState } from 'react';
import useFetchAirportDetails from 'hooks/useFetchAirportDetails';
import usePaginator from 'hooks/usePaginator';
import { Pagination, Dimmer, Loader, List, Segment, Container, Card, Button } from 'semantic-ui-react';

const ListContainer = ({ airports, airportOnClick, isSuccess }) =>
  isSuccess && (
    <List data-testid="airport-list" divided verticalAlign="middle">
      {airports.map(({ airportCode, airportName, country: { countryName } }) => {
        return (
          <List.Item data-testid="airport-list-item" key={airportCode} onClick={airportOnClick}>
            <List.Content data-testid="airport-name">{airportName}</List.Content>
            <List.Content data-testid="airport-country">{countryName}</List.Content>
          </List.Item>
        );
      })}
    </List>
  );

const AirportCard = ({ backOnClick }) => (
  <Card.Group>
    <Card data-testid="airport-card">
      <Card.Content>
        <Card.Header>Matthew Harris</Card.Header>
        <Card.Meta>Co-Worker</Card.Meta>
        <Card.Description>Matthew is a pianist living in Nashville.</Card.Description>
        <Button data-testid="airport-card-back" onClick={backOnClick}>
          Click Here
        </Button>
      </Card.Content>
    </Card>
  </Card.Group>
);

const App = ({ url }) => {
  const [{ isLoading, isComplete, isSuccess, isError, data }, fetch] = useFetchAirportDetails({ url });
  const [{ paginatedList, totalPages }, paginate] = usePaginator();
  const [isViewingAirport, setIsViewAirport] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isSuccess) {
      paginate({ list: data });
    }
  }, [data, isSuccess]);

  const airportOnClick = () => setIsViewAirport(true);
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
          <AirportCard backOnClick={backOnClick} />
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
