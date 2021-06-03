import { Heading, Text, Box } from '@chakra-ui/react';
import AddSiteModal from '@/components/AddSiteModal';

const EmptyState = () => {
  return (
    <Box backgroundColor='white' p={16} align='center' borderRadius={8}>
      <Heading mb={2}>You haven’t added any site.</Heading>
      <Text mb={4}>Welcome, Let’s get started!</Text>
      <AddSiteModal>Add your first site</AddSiteModal>
    </Box>
  );
};

export default EmptyState;
