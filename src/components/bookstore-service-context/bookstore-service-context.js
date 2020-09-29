import React from 'react';

const {
  Provider: WorklogstoreServiceProvider,
  Consumer: WorklogstoreServiceConsumer,
} = React.createContext();

export { WorklogstoreServiceProvider, WorklogstoreServiceConsumer };