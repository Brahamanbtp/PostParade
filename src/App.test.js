import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

// Mock useAuth hook
jest.mock('./context/AuthContext', () => ({
  ...jest.requireActual('./context/AuthContext'),
  useAuth: () => ({
    user: { username: 'testuser' },
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
  }),
}));

describe('App Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <AuthProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </AuthProvider>
      </Router>
    );
  });

  test('renders the navbar', () => {
    const navbarElement = screen.getByText(/Imageboard App/i);
    expect(navbarElement).toBeInTheDocument();
  });

  test('renders the homepage by default', () => {
    const homepageElement = screen.getByText(/Welcome to Imageboard App/i);
    expect(homepageElement).toBeInTheDocument();
  });

  test('navigates to the login page', () => {
    const loginLink = screen.getByText(/Login/i);
    fireEvent.click(loginLink);

    const loginPageElement = screen.getByText(/Login to your account/i);
    expect(loginPageElement).toBeInTheDocument();
  });

  test('navigates to the register page', () => {
    const registerLink = screen.getByText(/Register/i);
    fireEvent.click(registerLink);

    const registerPageElement = screen.getByText(/Create a new account/i);
    expect(registerPageElement).toBeInTheDocument();
  });

  test('renders the footer', () => {
    const footerElement = screen.getByText(/© \d{4} Imageboard App. All rights reserved./i);
    expect(footerElement).toBeInTheDocument();
  });

  test('displays admin panel link when user is logged in as admin', () => {
    // Mock user as admin
    jest.mock('./context/AuthContext', () => ({
      ...jest.requireActual('./context/AuthContext'),
      useAuth: () => ({
        user: { username: 'admin', isAdmin: true },
        login: jest.fn(),
        logout: jest.fn(),
        register: jest.fn(),
      }),
    }));

    render(
      <Router>
        <AuthProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </AuthProvider>
      </Router>
    );

    const adminLink = screen.getByText(/Admin Panel/i);
    expect(adminLink).toBeInTheDocument();
  });
});