import React, { Fragment } from 'react';
import { Pagination, List, Segment, Header, Icon } from 'semantic-ui-react';

const ListContainer = ({ airports, airportOnClick, isSuccess, currentPage, totalPages, pageChange }) =>
  isSuccess && (
    <Fragment>
      <Header as="h2" icon textAlign="center">
        <Icon name="plane" />
        Airports
        <Header.Subheader>Click on an airport to find out more details.</Header.Subheader>
      </Header>
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
      <Segment textAlign="center" basic>
        <Pagination data-testid="pagination" activePage={currentPage} totalPages={totalPages} onPageChange={pageChange} />
      </Segment>
    </Fragment>
  );

export default ListContainer;
