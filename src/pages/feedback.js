import useSWR from 'swr';
import { Heading, Box, Flex } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import EmptyState from '@/components/EmptyState';
import FeedbackTable from '@/components/FeedbackTable';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import fetcher from '@/utils/fetcher';
import { useAuth } from '@/lib/auth';

const MyFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);

  return (
    <>
      <Navbar />
      <Box backgroundColor='gray.100' h='100vh'>
        <Flex maxW='800px' direction='column' margin='0 auto'>
          <Flex justify='space-between' mt={8} mb={4}>
            <Heading>My Feedback</Heading>
          </Flex>
          {!data ? (
            <SiteTableSkeleton />
          ) : !data.feedback.length ? (
            <EmptyState />
          ) : (
            <FeedbackTable feedback={data.feedback} />
          )}
        </Flex>
      </Box>
    </>
  );
};

export default MyFeedback;
