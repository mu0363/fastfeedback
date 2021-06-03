import { useState } from 'react';
import { Box, Switch } from '@chakra-ui/react';
import { Td } from './Table';
import RemoveButton from '@/components/RemoveButton';
import { updateFeedback } from '@/lib/db';

const FeedbackRow = ({ author, text, id, status }) => {
  const [isChecked, setChecked] = useState(status);

  const toggleFeedback = async () => {
    updateFeedback(id, isChecked ? false : true);
    setChecked(!isChecked);
  };

  return (
    <Box as='tr'>
      <Td>{author}</Td>
      <Td>{text}</Td>
      <Td>{'/'}</Td>
      <Td>
        <Switch isChecked={isChecked} onChange={toggleFeedback} />
      </Td>
      <Td>
        <RemoveButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
