import { Table, Th, Tr } from './Table';
import FeedbackRow from '@/components/FeedbackRow';

const FeedbackTable = ({ feedback }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Comment</Th>
          <Th>Route</Th>
          <Th>Status</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedback.map((f) => (
          <FeedbackRow key={f.id} {...f} />
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
