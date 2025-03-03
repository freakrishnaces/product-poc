import { vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('@module-federation/vite', () => {
  return {
    federation: () => ({
      name: 'mock-plugin',
    }),
  };
});

vi.mock('remote/Component', () => {
  return {
    default: () => 'MockedRemoteComponent',
  };
});