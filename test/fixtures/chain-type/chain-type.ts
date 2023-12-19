import { ref } from '~'

interface User {
  id: string
  name: string
  email: string
}

interface Post {
  postId: string
  authorId: string
  author: User
  content: string
}

interface Comment {
  commentId: string
  postId: string
  authorId: string
  author: User
  post: Post
  content: string
}

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
    } satisfies Record<string, User>,
    posts: {
      '001': {
        postId: '001',
        authorId: '12345',
        author: ref<User>('#/datas/users/12345'),
        content: 'This is the first post content.',
      },
      '002': {
        postId: '002',
        authorId: '67890',
        author: ref<User>('#/datas/users/67890'),
        content: 'This is the second post content.',
      },
    } satisfies Record<string, Post>,
  },
  comments: [
    {
      commentId: '001',
      postId: '001',
      authorId: '67890',
      post: ref<Post>('#/datas/posts/001'),
      author: ref<User>('#/datas/users/67890'),
      content: 'This is the first comment content.',
    },
    {
      commentId: '002',
      postId: '001',
      authorId: '12345',
      post: ref<Post>('#/datas/posts/001'),
      author: ref<User>('#/datas/users/12345'),
      content: 'This is the second comment content.',
    },
  ] satisfies Comment[],
}
