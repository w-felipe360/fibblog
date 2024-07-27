export interface User {
  id: number;
  name: string;
  description: string;
}

export const fakeUsers: { [email: string]: { password: string; user: User } } =
  {
    "user1@example.com": {
      password: "password123",
      user: { id: 1, name: "User One", description: "Descrição do usuário um" },
    },
    "user2@example.com": {
      password: "password456",
      user: {
        id: 2,
        name: "User Two",
        description: "Descrição do usuário dois",
      },
    },
  };
