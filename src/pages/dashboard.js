import useSWR from 'swr';
import { Heading, Box, Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import AddSiteModal from '@/components/AddSiteModal';
import EmptyState from '@/components/EmptyState';
import SiteTable from '@/components/SiteTable';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user?.token] : [], fetcher);

  return (
    <>
      <Navbar />
      <Box backgroundColor='gray.100' h='100vh'>
        <Flex maxW='800px' direction='column' margin='0 auto'>
          <Flex justify='space-between' mt={8} mb={4}>
            <Heading>Sites</Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
          </Flex>
          {!data ? (
            <SiteTableSkeleton></SiteTableSkeleton>
          ) : data.sites.length === 0 ? (
            <EmptyState />
          ) : (
            <SiteTable sites={data.sites} />
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Dashboard;
