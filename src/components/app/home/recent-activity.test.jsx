import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { RecentActivity } from './recent-activity';

vi.mock('lucide-react', () => ({
  FileText: () => <div data-testid="icon-filetext" />,
  Image: () => <div data-testid="icon-image" />,
  Mail: () => <div data-testid="icon-mail" />,
  Music: () => <div data-testid="icon-music" />,
  Video: () => <div data-testid="icon-video" />,
  File: () => <div data-testid="icon-file" />,
  Folder: () => <div data-testid="icon-folder" />,
  Code: () => <div data-testid="icon-code" />,
  Settings: () => <div data-testid="icon-settings" />,
  Calendar: () => <div data-testid="icon-calendar" />,
  User: () => <div data-testid="icon-user" />,
  ShoppingCart: () => <div data-testid="icon-shoppingcart" />,
  Heart: () => <div data-testid="icon-heart" />,
  Map: () => <div data-testid="icon-map" />,
  Book: () => <div data-testid="icon-book" />,
  Camera: () => <div data-testid="icon-camera" />,
  Headphones: () => <div data-testid="icon-headphones" />,
  Monitor: () => <div data-testid="icon-monitor" />,
  Smartphone: () => <div data-testid="icon-smartphone" />,
  Coffee: () => <div data-testid="icon-coffee" />
}));

vi.mock('../../common/card', () => ({
  Card: ({ children, className }) => <div data-testid="card" className={className}>{children}</div>,
  CardHeader: ({ children }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children }) => <div data-testid="card-title">{children}</div>,
  CardContent: ({ children }) => <div data-testid="card-content">{children}</div>
}));

describe('RecentActivity', () => {
  it('renders the card with correct title', () => {
    render(<RecentActivity />);
    
    expect(screen.getByTestId('card')).toBeDefined();
    expect(screen.getByTestId('card-title').textContent).toBe('Recent Activity');
  });

  it('renders all 20 recent items', () => {
    render(<RecentActivity />);
    
    expect(screen.getAllByText(/ago/).length).toBe(20);
  });

  it('renders items with correct labels', () => {
    render(<RecentActivity />);
    
    expect(screen.getByText('Document.pdf')).toBeDefined();
    expect(screen.getByText('Photo.jpg')).toBeDefined();
    expect(screen.getByText('Email draft')).toBeDefined();
    expect(screen.getByText('Song.mp3')).toBeDefined();
    expect(screen.getByText('Video.mp4')).toBeDefined();
    expect(screen.getByText('Notes.txt')).toBeDefined();
    expect(screen.getByText('Projects')).toBeDefined();
    expect(screen.getByText('Script.js')).toBeDefined();
    expect(screen.getByText('Preferences')).toBeDefined();
    expect(screen.getByText('Schedule')).toBeDefined();
    expect(screen.getByText('Profile')).toBeDefined();
    expect(screen.getByText('Cart')).toBeDefined();
    expect(screen.getByText('Favorites')).toBeDefined();
    expect(screen.getByText('Location')).toBeDefined();
    expect(screen.getByText('Reading List')).toBeDefined();
    expect(screen.getByText('Camera Roll')).toBeDefined();
    expect(screen.getByText('Playlist')).toBeDefined();
    expect(screen.getByText('Dashboard')).toBeDefined();
    expect(screen.getByText('Mobile App')).toBeDefined();
    expect(screen.getByText('Break Time')).toBeDefined();
  });

  it('renders items with correct time labels', () => {
    render(<RecentActivity />);
    
    expect(screen.getByText('2 mins ago')).toBeDefined();
    expect(screen.getByText('5 mins ago')).toBeDefined();
    expect(screen.getByText('10 mins ago')).toBeDefined();
    expect(screen.getByText('4.5 hours ago')).toBeDefined();
  });

  it('renders all icons', () => {
    render(<RecentActivity />);
    
    expect(screen.getByTestId('icon-filetext')).toBeDefined();
    expect(screen.getByTestId('icon-image')).toBeDefined();
    expect(screen.getByTestId('icon-mail')).toBeDefined();
    expect(screen.getByTestId('icon-music')).toBeDefined();
    expect(screen.getByTestId('icon-video')).toBeDefined();
    expect(screen.getByTestId('icon-file')).toBeDefined();
    expect(screen.getByTestId('icon-folder')).toBeDefined();
    expect(screen.getByTestId('icon-code')).toBeDefined();
    expect(screen.getByTestId('icon-settings')).toBeDefined();
    expect(screen.getByTestId('icon-calendar')).toBeDefined();
    expect(screen.getByTestId('icon-user')).toBeDefined();
    expect(screen.getByTestId('icon-shoppingcart')).toBeDefined();
    expect(screen.getByTestId('icon-heart')).toBeDefined();
    expect(screen.getByTestId('icon-map')).toBeDefined();
    expect(screen.getByTestId('icon-book')).toBeDefined();
    expect(screen.getByTestId('icon-camera')).toBeDefined();
    expect(screen.getByTestId('icon-headphones')).toBeDefined();
    expect(screen.getByTestId('icon-monitor')).toBeDefined();
    expect(screen.getByTestId('icon-smartphone')).toBeDefined();
    expect(screen.getByTestId('icon-coffee')).toBeDefined();
  });

  it('renders items with correct structure', () => {
    render(<RecentActivity />);
    
    const items = screen.getAllByText(/ago/);
    expect(items.length).toBe(20);
    
    items.forEach(item => {
      const container = item.closest('div').parentElement;
      expect(container.className).toContain('flex items-center');
      
      const iconContainer = container.querySelector('div.p-2.rounded-full');
      expect(iconContainer).toBeDefined();
      
      const labelContainer = item.closest('div');
      expect(labelContainer.className).toContain('flex flex-col');
    });
  });
});