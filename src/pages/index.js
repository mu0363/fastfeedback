import Head from 'next/head';
import { Text, Link, Box, Button, Flex } from '@chakra-ui/react';
import { FastFeedbackIcon, GithubIcon, GoogleIcon } from '@/public/icons';
import { useAuth } from '@/lib/auth';

const Home = () => {
  const auth = useAuth();
  return (
    <div>
      <Head>
        <title>FastFeedback</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
            window.location.href = "/dashboard"
          }
        `,
          }}
        />
      </Head>
      <Box backgroundColor='gray.100'>
        <Box maxW='800px' margin='0 auto' py={16}>
          <FastFeedbackIcon boxSize={36} />
          <Text>
            <Text as='span' fontWeight='bold'>
              Fast Feedback {process.env.NEXT_PUBLIC_FIREBASE_API_KEY}
            </Text>
            {' was built as part of '}
            <Link textDecoration='underline'>React 2025</Link>
            {
              ". It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below."
            }
          </Text>
          <Box mt={8}>
            <Button
              leftIcon={<GithubIcon />}
              backgroundColor='gray.900'
              color='white'
              mr={4}
              onClick={() => auth.signInWithGithub()}
            >
              Sign in with GitHub
            </Button>
            <Button
              leftIcon={<GoogleIcon />}
              backgroundColor='white'
              onClick={() => auth.signInWithGoogle()}
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Box>
      <Box maxW='800px' margin='0 auto' mt={4}>
        <Flex justify='space-between'>
          <Text fontWeight='bold'>Leave a comment →</Text>
          <Text>Powered by Fast Feedback</Text>
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
