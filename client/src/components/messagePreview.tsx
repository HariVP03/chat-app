import React from 'react';
import { Flex, chakra, Avatar, Text } from '@chakra-ui/react';

const MessagePreview: React.FC<{
  senderName: string;
  message: string;
  senderAvatar?: string;
  timeSent: Date;
  handleOnClick: React.Dispatch<
    React.SetStateAction<{
      senderName: string;
      senderStatus: 'Online' | 'Busy' | 'Typing...' | 'Offline' | '';
      senderAvatar: string | undefined;
    }>
  >;
}> = ({ senderName, message, senderAvatar, timeSent, handleOnClick }) => {
  return (
    <Flex
      cursor="pointer"
      onClick={e => {
        handleOnClick({
          senderName,
          senderStatus: 'Online',
          senderAvatar,
        });
      }}
      bg="#90e0ef"
      direction="column"
      w="98%"
      my={1}
      minH="100px"
      maxH="100px"
      p={2}
      rounded="lg"
      overflowY="hidden"
      transition="background 0.2s"
      _hover={{ bg: '#89c2d9' }}
    >
      <Flex>
        <Avatar mr={3} src={senderAvatar} />
        <Flex direction="column" ml={1}>
          <chakra.h4 mb={0} fontFamily="'Karla', sans-serif;">
            {senderName}
            <Text
              fontFamily="'Karla', sans-serif;"
              fontWeight="normal"
              color="gray.700"
              mb={1}
            >
              {'an hour ago'}
            </Text>
          </chakra.h4>
          <Text>{message}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MessagePreview;
