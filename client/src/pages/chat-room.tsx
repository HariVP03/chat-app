import React, { useEffect, useState } from 'react';
import { Flex, chakra, Input, useDisclosure, Button } from '@chakra-ui/react';
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
    roomCode: string;
    title: string;
    senderStatus: 'Online' | 'Busy' | 'Typing...' | 'Offline' | '';
  }>({ title: 'Public Room #1', senderStatus: 'Online', roomCode: '1' });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomCode, setRoomCode] = useState('1');

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
              title="Public Room #1"
              desc="Room Code: 1"
              handleOnClickDataChange={setData}
              roomCode={roomCode}
              handleOnClickRoomJoin={() => {
                socket.emit('join', '1', roomCode);
                setRoomCode('1');
              }}
            />

            <MessagePreview
              title="Public Room #2"
              desc="Room Code: 2"
              handleOnClickDataChange={setData}
              roomCode={roomCode}
              handleOnClickRoomJoin={() => {
                socket.emit('join', '2', roomCode);
                setRoomCode('2');
              }}
            />
          </Flex>
        </Flex>
        <ChatBox
          username={username}
          roomCode={roomCode}
          messages={messages}
          senderName={data.title}
          senderStatus={data.senderStatus}
          onMsgSend={(name, msg, roomCode) => {
            socket.emit('message', { name, msg, roomCode });
          }}
        />
      </Flex>
      <UserModal setUsername={setUsername} onClose={onClose} isOpen={isOpen} />
    </Flex>
  );
};

export default ChatRoom;
