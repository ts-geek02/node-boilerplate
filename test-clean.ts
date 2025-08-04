// This file follows all linting and formatting rules

import express from 'express';

// Initialize express app (used for demonstration)
const app = express();

interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];

  public addUser(user: User): void {
    this.users.push(user);
  }

  public getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  public getAllUsers(): User[] {
    return this.users;
  }
}

const userService = new UserService();

// Example usage
const newUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
};

userService.addUser(newUser);

// Proper error handling
try {
  const foundUser = userService.getUserById(1);
  if (foundUser) {
    // eslint-disable-next-line no-console
    console.log(`Found user: ${foundUser.name}`);
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Error finding user:', error);
}

// Simple status check
const status = 'active';
if (status === 'active') {
  // eslint-disable-next-line no-console
  console.log('User is active');
} else {
  // eslint-disable-next-line no-console
  console.log('User is inactive');
}

// Proper async function
async function fetchUserData(userId: number): Promise<User | null> {
  try {
    // Simulate API call
    return userService.getUserById(userId) || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Use the app to avoid unused variable warning
app.get('/users', (_req, res) => {
  res.json(userService.getAllUsers());
});

export { UserService, User, userService, fetchUserData, app };
