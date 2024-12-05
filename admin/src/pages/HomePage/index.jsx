/**
 *
 * HomePage
 *
 */
import React from 'react';
import { Box, Typography, Main } from '@strapi/design-system';
import ClearCache from './ClearCache';

const HomePage = () => {
  return (
    <Main>
      <Box padding={8} background="neutral100">
        <Box paddingBottom={4}>
          <Typography variant="alpha" as="h1">
            Refresh Stellate cache
          </Typography>
        </Box>
        
        <Box 
          background="neutral0" 
          padding={4} 
          shadow="filterShadow" 
          hasRadius
        >
          <ClearCache />
        </Box>
      </Box>
    </Main>
  );
};

export default HomePage;
