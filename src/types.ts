/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppView = 'onboarding' | 'book_ride' | 'tracking' | 'activity' | 'admin';

export type TabType = 'home' | 'activity' | 'wallet' | 'profile';

export interface RideOption {
  id: 'economy' | 'luxury' | 'prime';
  name: string;
  price: number;
  eta: number; // minutes away
  seats: number;
  features: string;
  image: string;
  tag?: string;
  hasSnacks?: boolean;
}

export interface ActivityItem {
  id: string;
  date: string;
  time: string;
  type: string;
  price: number;
  pickup: string;
  destination: string;
  status: 'Completed' | 'Cancelled';
  driverName?: string;
  driverImage?: string;
  rating?: number;
  donationAmount?: number;
  icon: 'directions_car' | 'electric_car' | 'commute';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'driver';
  text: string;
  timestamp: string;
}
