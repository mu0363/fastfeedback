import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { checkoutSessionRef, goToBillingPortal } from '@/lib/db';

const Account = () => {
  const auth = useAuth();
  const [isCheckoutLoading, setCheckoutLoading] = useState(false);
  const [isBillingLoading, setBillingLoading] = useState(false);

  return (
    <div>
      <Navbar />
      <Box mt={8}>
        <Button
          backgroundColor='gray.900'
          color='white'
          mr={4}
          _hover={{ bg: 'gray.700' }}
          isLoading={isCheckoutLoading}
          onClick={() => {
            setCheckoutLoading(true);
            checkoutSessionRef(auth.user.uid);
          }}
        >
          Upgrade to Starter
        </Button>
        <Button
          backgroundColor='gray.900'
          color='white'
          mr={4}
          _hover={{ bg: 'gray.700' }}
          isLoading={isBillingLoading}
          onClick={() => {
            setBillingLoading(true);
            goToBillingPortal();
          }}
        >
          Manage Billing
        </Button>
        <Button backgroundColor='white' onClick={() => auth.signOut()}>
          Sign out
        </Button>
      </Box>
    </div>
  );
};

export default Account;
