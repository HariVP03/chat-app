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
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

const UserModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  setUsername: Dispatch<SetStateAction<string>>;
}> = ({ isOpen, onClose, setUsername }) => {
  const [name, setName] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Your Name</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>New Name</FormLabel>
            <Input
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <FormHelperText>Enter your new name here</FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setUsername(name || 'Anonymous');
              onClose();
            }}
          >
            Change
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
