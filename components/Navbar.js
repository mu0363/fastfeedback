import NextLink from 'next/link';
import { Flex, Stack, Link, Avatar } from '@chakra-ui/react';
import { FastFeedbackIcon } from '@/public/icons';
import { useAuth } from '@/lib/auth';

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div>
      <Flex justify='space-between' backgroundColor='white' py={4} px={8}>
        <Stack direction={['column', 'row']} spacing='24px' align='center'>
          <FastFeedbackIcon boxSize={8} />
          <NextLink href='/dashboard' passHref>
            <Link>Sites</Link>
          </NextLink>
          <NextLink href='/feedback' passHref>
            <Link>Feedback</Link>
          </NextLink>
        </Stack>
        <Flex align='center'>
          <NextLink href='/account' passHref>
            <Link mr={4}>Account</Link>
          </NextLink>
          <Avatar src={user?.photoURL} size='sm' />
        </Flex>
      </Flex>
    </div>
  );
};

export default Navbar;
