export const fixture = {
  datas: {
    users: {
      '12345': {
        id: '12345',
        name: 'Alice',
        email: 'alice@example.com',
      },
      '67890': {
        id: '67890',
        name: 'Bob',
        email: 'bob@example.com',
      },
    },
  },
  posts: [
    {
      postId: '001',
      authorId: '12345',
      author: { $ref: '#/datas/users/12345' } as const,
      content: 'This is the first post content.',
    },
    {
      postId: '002',
      authorId: '67890',
      author: { $ref: '#/datas/users/67890' } as const,
      content: 'This is the second post content.',
    },
  ],
}
