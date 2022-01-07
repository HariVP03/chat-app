import React, { useState } from 'react';
import { Flex, chakra, Avatar, Input, Button } from '@chakra-ui/react';

const ChatBox: React.FC<{
  senderName: string;
  roomCode: string;
  username: string;
  onMsgSend: (name: string, msg: string, roomCode: string) => void;
  messages: {
    senderName: string;
    msg: string;
  }[];
  senderStatus: 'Online' | 'Busy' | 'Typing...' | 'Offline' | '';
}> = ({
  senderName,
  senderStatus,
  onMsgSend,
  username,
  messages,
  roomCode,
}) => {
  const [msg, setMsg] = useState('');

  return (
    <Flex minW="60%" minH="100%" direction="column">
      <Flex
        direction="column"
        justify="center"
        minH="12%"
        bg="#2A2F32"
        w="100%"
        pl={3}
      >
        <Flex>
          <Flex ml={2} direction="column" justify="center">
            <chakra.h2
              fontSize="lg"
              color="white"
              fontFamily="'Karla', sans-serif;"
              my={0}
            >
              {senderName}
            </chakra.h2>
            <chakra.h3 color="white" fontFamily="'Karla', sans-serif;" my={0}>
              {senderStatus}
            </chakra.h3>
          </Flex>
        </Flex>
      </Flex>
      <Flex minH="88%" bg="#262D31" direction="column">
        <Flex w="full" h="90%" overflowY="scroll" direction="column">
          {messages?.map(e => {
            return (
              <Flex
                justify={e.senderName === username ? 'end' : 'start'}
                align="center"
                w="full"
                minH="10%"
              >
                <Flex
                  justify="center"
                  bg={e.senderName === username ? '#056162' : '#2A2F32'}
                  m={3}
                  px={2}
                  roundedTop="md"
                  roundedBottomLeft={e.senderName === username ? 'md' : 'auto'}
                  roundedBottomRight={e.senderName !== username ? 'md' : 'auto'}
                  direction="column"
                  h="95%"
                >
                  <chakra.h1
                    fontFamily="'Karla', sans-serif;"
                    color="gray.200"
                    fontWeight="bold"
                    pb={2}
                  >
                    {e.senderName}
                  </chakra.h1>
                  <chakra.h3 color="gray.200" fontFamily="'Karla', sans-serif;">
                    {e.msg}
                  </chakra.h3>
                </Flex>
              </Flex>
            );
          })}
        </Flex>
        <Flex w="full" h="10%" align="center">
          <Input
            ml={2}
            type="text"
            value={msg}
            placeholder="Type your message here"
            border="1px solid"
            color="white"
            borderColor="gray.600"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onMsgSend(username, msg, roomCode);
                setMsg('');
              }
            }}
            onChange={e => {
              setMsg(e.target.value);
            }}
          />
          <Button
            disabled={!Boolean(msg)}
            mx={2}
            onClick={() => {
              onMsgSend(username, msg, roomCode);
              setMsg('');
            }}
          >
            Send
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatBox;
