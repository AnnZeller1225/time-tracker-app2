import React from 'react';
import { WorklogstoreServiceConsumer } from "../bookstore-service-context";

const withWorklogstoreService = () => (Wrapped) => {
  return (props) => {
    return (
      <WorklogstoreServiceConsumer>
        {(worklogstoreService) => {
          return <Wrapped {...props} worklogstoreService={worklogstoreService} />;
        }}
      </WorklogstoreServiceConsumer>
    );
  };
};

export default withWorklogstoreService;