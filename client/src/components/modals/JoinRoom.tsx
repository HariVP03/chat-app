import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const JoinRoomModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roomCode: string) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [roomCode, setRoomCode] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join a Room</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Room Code</FormLabel>
            <Input
              value={roomCode}
              onChange={e => {
                setRoomCode(e.target.value);
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSubmit(roomCode);
            }}
          >
            Join
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinRoomModal;
