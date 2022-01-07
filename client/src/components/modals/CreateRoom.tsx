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
import { maxSafeInteger } from '@chakra-ui/utils';

const CreateRoomModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, desc: string, roomCode: string) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  let roomCode = String(Math.round(Math.random() * 10000));
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Room</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              value={desc}
              onChange={e => {
                setDesc(e.target.value);
              }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Room Code</FormLabel>
            <Input value={roomCode} readOnly />
            <FormHelperText>
              Share this code with whoever you want to be in this room
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSubmit(title, desc, roomCode);
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
