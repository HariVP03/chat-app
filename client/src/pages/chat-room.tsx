import React, { useEffect, useState } from 'react';
import { Flex, chakra, Input, useDisclosure, Button } from '@chakra-ui/react';
import MessagePreview from '../components/messagePreview';
import ChatBox from '../components/chatBox';
import '../components/layout.css';
import io from 'socket.io-client';
import UserModal from '../components/modals/UserModal';
import CreateRoomModal from '../components/modals/CreateRoom';
import JoinRoomModal from '../components/modals/JoinRoom';

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
  const {
    isOpen: isOpenEditName,
    onOpen: onOpenEditName,
    onClose: onCloseEditName,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateRoom,
    onOpen: onOpenCreateRoom,
    onClose: onCloseCreateRoom,
  } = useDisclosure();
  const {
    isOpen: isOpenJoinRoom,
    onOpen: onOpenJoinRoom,
    onClose: onCloseJoinRoom,
  } = useDisclosure();
  const [roomCode, setRoomCode] = useState('1');
  const [rooms, setRooms] = useState<
    {
      title: string;
      desc: string;
      handleOnClickDataChange: () => void;
      roomCode: string;
      handleOnClickRoomJoin: () => void;
    }[]
  >([]);

  useEffect(() => {
    setMessages([]);
  }, [roomCode]);

  return (
    <Flex justify="center" align="center" h="100vh" w="100vw" bg="gray.800">
      <Flex minW="95vw" h="95vh" bg="#2b2d42" rounded="md">
        <Flex
          p={3}
          direction="column"
          minW="40%"
          minH="90%"
          roundedLeft="md"
          bg="#2A2F32"
          className="hide-scrollbar"
          overflowY="scroll"
        >
          <Flex mb={3} direction="column">
            <chakra.h1
              fontFamily="'Karla', sans-serif;"
              w="full"
              fontWeight="700"
              my={3}
              textAlign="center"
              fontSize="3xl"
              color="gray.200"
            >
              Welcome, {username}!
            </chakra.h1>
            <Input
              type="search"
              value={input}
              onChange={e => {
                setInput(e.target.value);
              }}
              borderColor="gray.600"
              placeholder="Search..."
            />
            <Button
              bg="#131C21"
              _hover={{ bg: '#323739' }}
              border="1px solid black"
              my={1}
              onClick={onOpenEditName}
              color="gray.200"
            >
              Change name
            </Button>
            <Button
              bg="#131C21"
              _hover={{ bg: '#323739' }}
              border="1px solid black"
              mb={1}
              onClick={onOpenCreateRoom}
              color="gray.200"
            >
              Create a Room
            </Button>
            <Button
              bg="#131C21"
              _hover={{ bg: '#323739' }}
              border="1px solid black"
              onClick={onOpenJoinRoom}
              color="gray.200"
            >
              Join a Room
            </Button>
          </Flex>
          <Flex justify="center" direction="column">
            <MessagePreview
              title="Public Room #1"
              desc="Room Code: 1"
              handleOnClickDataChange={setData}
              roomCode={roomCode}
              selected={roomCode === '1'}
              handleOnClickRoomJoin={() => {
                socket.emit('join', '1', roomCode);
                setRoomCode('1');
                setMessages([]);
              }}
            />

            <MessagePreview
              title="Public Room #2"
              desc="Room Code: 2"
              selected={roomCode === '2'}
              handleOnClickDataChange={setData}
              roomCode={roomCode}
              handleOnClickRoomJoin={() => {
                socket.emit('join', '2', roomCode);
                setRoomCode('2');
                setMessages([]);
              }}
            />
            {rooms?.map(e => {
              console.log(e.roomCode, roomCode);

              return (
                <MessagePreview
                  key={e.roomCode}
                  title={e.title}
                  desc={e.desc}
                  selected={e.roomCode === roomCode}
                  handleOnClickDataChange={e.handleOnClickDataChange}
                  roomCode={e.roomCode}
                  handleOnClickRoomJoin={e.handleOnClickRoomJoin}
                />
              );
            })}
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
      <UserModal
        setUsername={setUsername}
        onClose={onCloseEditName}
        isOpen={isOpenEditName}
      />
      <CreateRoomModal
        isOpen={isOpenCreateRoom}
        onClose={onCloseCreateRoom}
        onSubmit={(title: string, desc: string, roomCodeNew: string) => {
          setRooms(prev => {
            let temp = JSON.parse(JSON.stringify(prev));
            temp.push({
              title,
              desc,
              handleOnClickDataChange: () => {
                setData({
                  roomCode: roomCodeNew,
                  senderStatus: 'Online',
                  title,
                });
                setMessages([]);
              },
              roomCode: roomCodeNew,
              handleOnClickRoomJoin: () => {
                socket.emit('join', roomCodeNew, roomCode);
                setRoomCode(roomCodeNew);
              },
            });
            console.log(temp);

            return temp;
          });
          console.log(rooms);
          onCloseCreateRoom();
        }}
      />
      <JoinRoomModal
        isOpen={isOpenJoinRoom}
        onClose={onCloseJoinRoom}
        onSubmit={roomCodeJoin => {
          socket.emit('join', roomCodeJoin, roomCode);
          setRoomCode(roomCodeJoin);
          setData({
            roomCode: roomCodeJoin,
            senderStatus: 'Online',
            title: `Joined Room #${roomCodeJoin}`,
          });
          onCloseJoinRoom();
        }}
      />
    </Flex>
  );
};

export default ChatRoom;
