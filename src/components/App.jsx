import React, { useEffect, useState } from 'react';
import useFetchAirportDetails from 'hooks/useFetchAirportDetails';
import usePaginator from 'hooks/usePaginator';
import ListContainer from 'components/ListContainer';
import AirportCard from 'components/AirportCard';
import { Dimmer, Loader, Segment, Container, Card, Button } from 'semantic-ui-react';

const App = ({ url }) => {
  const [isViewingAirport, setIsViewAirport] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [{ isLoading, isSuccess, isError, data }, fetch] = useFetchAirportDetails({ url });
  const [{ paginatedList, totalPages }, paginate] = usePaginator();

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

  useEffect(() => {
    if (isSuccess) {
      paginate({ list: data });
    }
  }, [data, isSuccess]);

  return (
    <Container text>
      <Segment placeholder={isLoading}>
        <Dimmer active={isLoading}>{isLoading && <Loader indeterminate>Loading...</Loader>}</Dimmer>
        {isError && <Segment>Something went wrong! Please try again</Segment>}
        {isViewingAirport ? (
          <AirportCard backOnClick={backOnClick} selectedAirport={selectedAirport} />
        ) : (
          <ListContainer
            airports={paginatedList}
            airportOnClick={airportOnClick}
            isSuccess={isSuccess}
            currentPage={currentPage}
            totalPages={totalPages}
            pageChange={pageChange}
          />
        )}
      </Segment>
    </Container>
  );
};

export default App;
