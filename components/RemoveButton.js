import { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const RemoveButton = ({ feedbackId }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteFeedback(feedbackId);
    mutate(
      ['/api/feedback', user?.token],
      async (data) => {
        return { feedback: data.feedback.filter((f) => f.id !== feedbackId) };
      },
      false
    );
    onClose();
  };
  const cancelRef = useRef();

  return (
    <>
      <Button variant='ghost' onClick={() => setIsOpen(true)}>
        <DeleteIcon />
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              これ消します
            </AlertDialogHeader>

            <AlertDialogBody>
              本当に消すのじゃな？ 後戻りはできぬぞ
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RemoveButton;
