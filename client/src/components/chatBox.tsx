import React, { useState } from 'react';
import { Flex, chakra, Avatar, Input, Button } from '@chakra-ui/react';

const ChatBox: React.FC<{
  senderName: string;
  username: string;
  onMsgSend: (name: string, msg: string) => void;
  messages: {
    senderName: string;
    msg: string;
  }[];
  senderStatus: 'Online' | 'Busy' | 'Typing...' | 'Offline' | '';
}> = ({ senderName, senderStatus, onMsgSend, username, messages }) => {
  const [msg, setMsg] = useState('');

  return (
    <Flex minW="60%" minH="100%" overflowY="scroll" direction="column">
      <Flex
        direction="column"
        justify="center"
        minH="12%"
        bg="#caf0f8"
        w="100%"
        pl={3}
      >
        <Flex>
          <Flex ml={2} direction="column" justify="center">
            <chakra.h3 fontFamily="'Signika Negative', sans-serif" my={0}>
              {senderName}
            </chakra.h3>
            <chakra.h4 fontFamily="'Signika Negative', sans-serif" my={0}>
              {senderStatus}
            </chakra.h4>
          </Flex>
        </Flex>
      </Flex>
      <Flex minH="88%" bg="#90e0ef" direction="column">
        <Flex w="full" h="90%" direction="column">
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
                  bg="green.500"
                  m={3}
                  px={2}
                  rounded="md"
                  direction="column"
                  h="95%"
                >
                  <chakra.h1 fontWeight="bold" color="blue.100" pb={2}>
                    {e.senderName}
                  </chakra.h1>
                  <chakra.h3>{e.msg}</chakra.h3>
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
            borderColor="gray.600"
            onChange={e => {
              setMsg(e.target.value);
            }}
          />
          <Button
            mx={2}
            onClick={() => {
              onMsgSend(username, msg);
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
