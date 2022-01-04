import React from 'react';
import { Flex, chakra, Avatar } from '@chakra-ui/react';

const ChatBox: React.FC<{
  senderName: string;
  senderStatus: 'Online' | 'Busy' | 'Typing...' | 'Offline' | '';
  senderAvatar: string | undefined;
}> = ({ senderName, senderStatus, senderAvatar }) => {
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
          {senderAvatar !== null ? <Avatar src={senderAvatar} /> : ''}
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
      <Flex minH="150vh"></Flex>
    </Flex>
  );
};

export default ChatBox;
