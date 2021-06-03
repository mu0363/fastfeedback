import { mutate } from 'swr';
import { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const AddSiteModal = ({ children }) => {
  const { user } = useAuth();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const { register, handleSubmit } = useForm();
  const onCreateSite = ({ name, url }) => {
    const newSite = {
      authorId: user.uid,
      author: user.name,
      createdAt: new Date().toISOString(),
      name,
      url,
    };
    // 怪奇!?👻 id入れてないのにconsole.logにはidがある...
    // console.log(newSite);
    createSite(newSite);
    mutate(
      ['/api/sites', user?.token],
      async (data) => {
        return { sites: [newSite, ...data.sites] };
      },
      false
    );
    toast({
      title: 'Site created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <>
      <Button
        backgroundColor='gray.900'
        color='white'
        _hover={{ bg: 'gray.700' }}
        _active={{ transform: 'scale(0.95)' }}
        onClick={onOpen}
      >
        {children}
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as='form' onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader>Create your site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Site name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Site name'
                name='name'
                ref={register({ required: true })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>URL</FormLabel>
              <Input
                placeholder='https://www.website.com'
                name='url'
                ref={register({ required: true })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button type='submit' colorScheme='blue'>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteModal;
