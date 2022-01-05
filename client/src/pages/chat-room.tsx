// @ts-ignore
import React, { useEffect, useState } from 'react';
import {
  Flex,
  chakra,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import MessagePreview from '../components/messagePreview';
import ChatBox from '../components/chatBox';
import '../components/layout.css';
import io from 'socket.io-client';
import UserModal from '../components/UserModal';

const socket = io('http://localhost:3000');

const ChatRoom = () => {
  const [messages, setMessages] = useState<
    {
      senderName: string;
      msg: string;
    }[]
  >([]);

  const [username, setUsername] = useState('Anonymous');

  useEffect(() => {
    socket.on('message', ({ name, msg }) => {
      setMessages(prev => {
        let temp = JSON.parse(JSON.stringify(prev));
        temp.push({
          senderName: name,
          msg,
        });
        return temp;
      });
    });
  }, []);

  const [input, setInput] = useState('');
  const [data, setData] = useState<{
    senderName: string;
    senderStatus: 'Online' | 'Busy' | 'Typing...' | 'Offline' | '';
  }>({ senderName: '', senderStatus: '' });

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex justify="center" align="center" h="100vh" w="100vw" bg="gray.800">
      <Flex minW="95vw" h="95vh" bg="#2b2d42" rounded="md">
        <Flex
          p={3}
          direction="column"
          minW="40%"
          minH="90%"
          roundedLeft="md"
          bg="#caf0f8"
          className="hide-scrollbar"
          overflowY="scroll"
        >
          <Flex mb={3} direction="column">
            <chakra.h1
              fontFamily="'Signika Negative', sans-serif"
              w="full"
              fontWeight="700"
              my={3}
              textAlign="center"
              fontSize="3xl"
            >
              Welcome, {username}!
            </chakra.h1>
            <Input
              type="search"
              value={input}
              onChange={e => {
                setInput(e.target.value);
              }}
              placeholder="Search..."
              borderColor="gray.400"
            />
            <Button onClick={onOpen}>Change name</Button>
          </Flex>
          <Flex justify="center" direction="column">
            <MessagePreview
              senderName="Hari Vishnu Parashar"
              message="Fugiat ad cillum ex occaecat."
              timeSent={new Date()}
              handleOnClick={setData}
            />
            <MessagePreview
              senderName="Leonardo Di Caprio"
              message="Enim dolore sit consequat ad proident..."
              timeSent={new Date()}
              handleOnClick={setData}
            />
          </Flex>
        </Flex>
        <ChatBox
          username={username}
          messages={messages}
          senderName={data.senderName}
          senderStatus={data.senderStatus}
          onMsgSend={(name, msg) => {
            socket.emit('message', { name, msg });
          }}
        />
      </Flex>
      <UserModal setUsername={setUsername} onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
};

export default ChatRoom;
