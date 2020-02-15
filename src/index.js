import React from 'react';
import { render } from 'react-dom';
import App from 'components/App';

const rootElement = document.getElementById('react-app');

const url = 'https://api.qantas.com/flight/refData/airport';

render(<App url={url} />, rootElement);
