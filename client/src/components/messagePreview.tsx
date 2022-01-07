import React from 'react';
import { Flex, chakra, Avatar, Text } from '@chakra-ui/react';

const MessagePreview: React.FC<{
  title: string;
  desc: string;
  roomCode: string;
  selected?: boolean;
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
  selected,
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
      bg={selected ? '#323739' : '#131C21'}
      direction="column"
      w="98%"
      my={1}
      minH="100px"
      maxH="100px"
      p={2}
      rounded="lg"
      overflowY="hidden"
      transition="background 0.2s"
      _hover={{ bg: '#323739' }}
    >
      <Flex>
        <Flex direction="column" ml={1}>
          <chakra.h2
            fontSize="lg"
            color="white"
            mb={0}
            fontFamily="'Karla', sans-serif;"
          >
            {title}
            <Text
              fontFamily="'Karla', sans-serif;"
              fontWeight="normal"
              mb={1}
              color="white"
            >
              {desc}
            </Text>
          </chakra.h2>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MessagePreview;
