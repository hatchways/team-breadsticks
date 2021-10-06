import { Conversation } from '../interface/Conversation';

const mockTest1Convos: Conversation[] = [
  {
    messages: [
      {
        recipientRead: false,
        _id: '61520b6d1f0f8804eb9c543f',
        sender: '61543bde13d3b5423c296154',
        text: 'test ---> test2',
        createdAt: '2021-09-27T18:20:29.089Z',
        updatedAt: '2021-09-27T18:20:29.089Z',
      },
      {
        recipientRead: false,
        _id: '61520b6d1f0f8804eb9c5440',
        sender: '61543bde13d3b5423c296154',
        text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        createdAt: '2021-09-27T18:20:29.198Z',
        updatedAt: '2021-09-27T18:20:29.198Z',
      },
      {
        recipientRead: false,
        _id: '61520b6d1f0f8804eb9c5441',
        sender: '61520b6c1f0f8804eb9c543c',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        createdAt: '2021-09-27T18:20:29.305Z',
        updatedAt: '2021-09-27T18:20:29.305Z',
      },
      {
        recipientRead: false,
        _id: '61520b6d1f0f8804eb9c5442',
        sender: '61520b6c1f0f8804eb9c543c',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        createdAt: '2021-09-27T18:20:29.562Z',
        updatedAt: '2021-09-27T18:20:29.562Z',
      },
      {
        recipientRead: false,
        _id: '61520b6d1f0f8804eb9c5443',
        sender: '61543bde13d3b5423c296154',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        createdAt: '2021-09-27T18:20:29.668Z',
        updatedAt: '2021-09-27T18:20:29.668Z',
      },
      {
        recipientRead: false,
        _id: '61520b6d1f0f8804eb9c5444',
        sender: '61543bde13d3b5423c296154',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        createdAt: '2021-09-27T18:20:29.668Z',
        updatedAt: '2021-09-27T18:20:29.668Z',
      },
    ],
    _id: '61520b6d1f0f8804eb9c5444',
    user1: {
      _id: '61543bde13d3b5423c296154',
      username: 'test',
      email: 'test@gmail.com',
    },
    user2: {
      _id: '61520b6c1f0f8804eb9c543c',
      username: 'test2',
      email: 'test2@gmail.com',
      profileImg: 'https://robohash.org/test2.png',
    },
    otherUser: {
      _id: '61520b6c1f0f8804eb9c543c',
      username: 'test2',
      email: 'test2@gmail.com',
      profileImg: 'https://robohash.org/test2.png',
    },
    latestMessage: {
      recipientRead: false,
      _id: '61520b6d1f0f8804eb9c5443',
      sender: '61543bde13d3b5423c296154',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      createdAt: '2021-09-27T18:20:29.668Z',
      updatedAt: '2021-09-27T18:20:29.668Z',
    },
    createdAt: '2021-09-27T18:20:29.770Z',
    updatedAt: '2021-09-27T18:20:29.770Z',
  },
  {
    messages: [
      {
        recipientRead: false,
        _id: '61520b6d1f0f8804eb9c5445',
        sender: '61543bde13d3b5423c296154',
        text: 'test ---> test3',
        createdAt: '2021-09-27T18:20:29.888Z',
        updatedAt: '2021-09-27T18:20:29.888Z',
      },
      {
        recipientRead: false,
        _id: '61520b6d1f0f8804eb9c5446',
        sender: '61543bde13d3b5423c296154',
        text: 'test ---> test3 (2nd)',
        createdAt: '2021-09-27T18:20:29.990Z',
        updatedAt: '2021-09-27T18:20:29.990Z',
      },
      {
        recipientRead: false,
        _id: '61520b6e1f0f8804eb9c5447',
        sender: '61543bde13d3b5423c296154',
        text: 'test ---> test3 (3rd)',
        createdAt: '2021-09-27T18:20:30.095Z',
        updatedAt: '2021-09-27T18:20:30.095Z',
      },
      {
        recipientRead: false,
        _id: '61520b6e1f0f8804eb9c5448',
        sender: '61520b6c1f0f8804eb9c543d',
        text: 'test3 ---> test',
        createdAt: '2021-09-27T18:20:30.188Z',
        updatedAt: '2021-09-27T18:20:30.188Z',
      },
      {
        recipientRead: false,
        _id: '61520b6e1f0f8804eb9c5449',
        sender: '61520b6c1f0f8804eb9c543d',
        text: 'test3 ---> test (2nd)',
        createdAt: '2021-09-27T18:20:30.289Z',
        updatedAt: '2021-09-27T18:20:30.289Z',
      },
      {
        recipientRead: false,
        _id: '61520b6e1f0f8804eb9c544a',
        sender: '61543bde13d3b5423c296154',
        text: 'test ---> test3 (4th)',
        createdAt: '2021-09-27T18:20:30.381Z',
        updatedAt: '2021-09-27T18:20:30.381Z',
      },
    ],
    _id: '61520b6e1f0f8804eb9c544b',
    user1: {
      _id: '61543bde13d3b5423c296154',
      username: 'test',
      email: 'test@gmail.com',
    },
    user2: {
      _id: '61520b6c1f0f8804eb9c543d',
      username: 'test3',
      email: 'test3@gmail.com',
      profileImg: 'https://robohash.org/test3.png',
    },
    otherUser: {
      _id: '61520b6c1f0f8804eb9c543d',
      username: 'test3',
      email: 'test3@gmail.com',
      profileImg: 'https://robohash.org/test3.png',
    },
    latestMessage: {
      recipientRead: false,
      _id: '61520b6e1f0f8804eb9c544a',
      sender: '61543bde13d3b5423c296154',
      text: 'test ---> test3 (4th)',
      createdAt: '2021-09-27T18:20:30.381Z',
      updatedAt: '2021-09-27T18:20:30.381Z',
    },
    createdAt: '2021-09-27T18:20:30.484Z',
    updatedAt: '2021-09-27T18:20:30.484Z',
  },
];

export { mockTest1Convos };