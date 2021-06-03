import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  Text,
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import Navbar from '@/components/Navbar';
import { getAllSites, getAllFeedback } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const Feedback = ({ initialFeedback }) => {
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const { user } = useAuth();
  const router = useRouter();
  const inputEl = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const newFeedback = {
      author: user.name,
      authorId: user.uid,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      siteId: router.query.siteId,
      status: false,
      text: inputEl.current.value,
    };
    createFeedback(newFeedback);
    setAllFeedback([newFeedback, ...allFeedback]);

    inputEl.current.value = '';
  };

  return (
    <>
      <Navbar />
      <Box backgroundColor='gray.100' h='100vh'>
        <Flex direction='column' maxW='800px' margin='0 auto'>
          <FormControl id='comment' mt={16}>
            <FormLabel>Add Comment</FormLabel>
            <Input ref={inputEl} type='comment' backgroundColor='white' />
          </FormControl>
          <Button
            mt={2}
            mb={8}
            backgroundColor='gray.600'
            color='white'
            _hover={{ bg: 'gray.700' }}
            onClick={onSubmit}
          >
            Add Comment
          </Button>
          {allFeedback.map((feedback, index) => (
            <Box
              key={index}
              bg='gray.50'
              maxW='800px'
              p={4}
              rounded='md'
              boxShadow='0px 4px 10px rgba(0, 0, 0, 0.05)'
              border='1px solid #eee'
              my={1}
            >
              <Heading as='h3' fontSize='sm'>
                {feedback.author}
              </Heading>
              <Text fontSize='xs'>
                {format(parseISO(feedback.createdAt), 'PPpp')}
              </Text>
              <Text my={4}>{feedback.text}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  );
};

export async function getStaticPaths() {
  const sites = await getAllSites();
  const paths = sites.map((site) => {
    return { params: { siteId: site.id } };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const feedback = await getAllFeedback(siteId);
  return {
    props: {
      initialFeedback: feedback,
    },
  };
}

export default Feedback;
