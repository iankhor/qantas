import React, { Fragment } from 'react';
import { Pagination, List } from 'semantic-ui-react';

const ListContainer = ({ airports, airportOnClick, isSuccess, currentPage, totalPages, pageChange }) =>
  isSuccess && (
    <Fragment>
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
      <Pagination data-testid="pagination" activePage={currentPage} totalPages={totalPages} onPageChange={pageChange} />
    </Fragment>
  );

export default ListContainer;
