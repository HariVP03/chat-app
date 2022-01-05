// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Flex, chakra, Input, Button } from '@chakra-ui/react';
import MessagePreview from '../components/messagePreview';
import ChatBox from '../components/chatBox';
import '../components/layout.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const ChatRoom = () => {
  const [messages, setMessages] = useState<
    {
      senderName: string;
      msg: string;
    }[]
  >([]);

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
              textAlign="center"
            >
              Welcome to your chat room
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
            {/*<Button*/}
            {/*  onClick={e => {*/}
            {/*    socket.emit('message', { name: 'haha', msg: input });*/}
            {/*  }}*/}
            {/*/>*/}
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
          messages={messages}
          senderName={data.senderName}
          senderStatus={data.senderStatus}
          onMsgSend={(name, msg) => {
            socket.emit('message', { name, msg });
          }}
        />
      </Flex>
    </Flex>
  );
};

export default ChatRoom;
