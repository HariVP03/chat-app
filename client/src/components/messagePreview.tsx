import React from 'react';
import { Flex, chakra, Avatar, Text } from '@chakra-ui/react';

const MessagePreview: React.FC<{
  title: string;
  desc: string;
  roomCode: string;
  handleOnClickRoomJoin: () => void;
  handleOnClickDataChange: React.Dispatch<
    React.SetStateAction<{
      roomCode: string;
      title: string;
      senderStatus: 'Online' | 'Busy' | 'Typing...' | 'Offline' | '';
    }>
  >;
}> = ({
  title,
  desc,
  handleOnClickDataChange,
  roomCode,
  handleOnClickRoomJoin,
}) => {
  return (
    <Flex
      cursor="pointer"
      onClick={e => {
        handleOnClickRoomJoin();
        handleOnClickDataChange({
          title,
          senderStatus: 'Online',
          roomCode,
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
        <Flex direction="column" ml={1}>
          <chakra.h4 mb={0} fontFamily="'Karla', sans-serif;">
            {title}
            <Text
              fontFamily="'Karla', sans-serif;"
              fontWeight="normal"
              color="gray.700"
              mb={1}
            >
              {desc}
            </Text>
          </chakra.h4>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MessagePreview;
