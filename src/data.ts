/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RideOption, ActivityItem } from './types';

export const HOTLINKED_IMAGES = {
  onboardingIllustration: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkSm7IN7ZpcmqjP4X8jwGJUgRcIJAqZRrJQdsFIOcMsQBs4LYP2aDt8eqU8OqEyraqFYBKoGtX6xMYX2Mm-kt20M8-h-0hcMTcU8Uh7D1fJ8vLkl4rNLD36W3bM2vEOnmiuOltzVHVLsOAYHRuyt-YjAkqqVHcz9O98AUbmVXSQsmL02oUE2bh06glqKVJN92ITYb41OTkHqPAIy6YeIqqGcsrCXAbfuvbJVzytAChIQ4RendFwImp9Q',
  userAvatarMale: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-EPuQP4U47c-FkxTIfWKMifxdLcQitxpONwqg9cM8ROm9T3-7f5HgjRA5XCsPP0YHjjNCVVAwwI3VgwemHdJoQLJ17R9ytNjWxP7KyBg6HeIiuZxOD-KWcj0z5_jIuiMawj5LgCaXukfEbamNCZ0TxbkAr9feLD-KyCf0e5kCUDIXx2YfqJni9oxS1d5Ic_AYQtLHaCLsuxslnWfG_8ht38mahiuOV6kjiXOJxqZkE4xF-j61KpvNMA',
  userAvatarFemale: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5KsARwmdR5l_cg65FsxphRxJmDkAH4n7jPu9ShH5Fu6n3BjTGRbFKae-DcqTZGW2qJr5-wxuPIvwRk6ieqVOV9e_lm-ilsUrYDtfmziKb8KTDsdeeYYn3FTBf0HaLqdDVo3gmBc1wz0WTfdWidGxZfoo5BJkugIf-naQxPGCdS0i-mVFCYWx0m3j9IW_P2f1gp_UsXeF8xS6Zhh21u0zurtca5vDm5oeJ3kBJwRsB2lAvQ1zhM9dihA',
  adminProfileAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJJnLOn83CyPER4QV085FoFeKM318lpD0yViUr1rnyw7kuEmjSNLjE1_U85SnRjZztQn8cEqqr4fS4vvomEQxm9czJKxon02GpvV73PTucFedqEqTXqMY6wF3LXhQpyYSd5QIbtGVsq63BvWXgW4KP1qgUiKgcGYw9V5Tu_Ff7klFPA3YmiLx3Ydu18-MS49S_FRIoQD0H0wpZAzvvloYYUw66V7lEKOFio16vXbACjfiZWMGIFeOg3w',
  bookingMapBackground: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ7cbmByWiQFCrsO12iSy-XOZfA5h3Lf-2RM3IwxjV4wj7eHrMeeHOexK2hjYQd0upq3DFnej2n-pecayCg9yDljS7uvMgGKaGTcDIN_ay6KCrb8NMUKb05g9l85ra0Q9yvHwoN6L_gSPzhs57d48LQf4C5ZRnVcTmQ0DhRITyb7tglkAyq8tiABdvbSccHCEGLmbr-z__yppqff0p6W4-dJUmxFmHh5POVz6f58nI-x9cirY26hSi2g',
  trackingMapBackground: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDixPpHHIf5-TcH1B8pyoNyXOtUyua364aneAf1ePKZMN0ZqFo6NcfPQ6TsJ3OMTfLEZ8RT7Y_NQc8mJSqIJODtpDa1vp57JTfTcyD74473aAru4UflsPaSJr3xYwQxAFD2P0lldPeFrdHnh3F_9kDVP-GYVBrYifd9fXC7fV3hN6vRaWQH-sTses6Lx12gsKkR_5TaYL88qmQgS1a7zrqJUWx-ixzC_HjbFa0iMWQnpPdHKqDE4baeg',
  driverRobertAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZcyS--e1Y9_g_5cf2SwNmjsxqKshu_b__z5G2cyctWCMc2nT_EgC_rBvmtAXWrDq7_lJG-iO6VQ2VFFvBPjREw4O9dZvAHkY9-13ku-3IRgDhef0pqhIGKvmZfaonbX6d4QoViCFNf3DFMMqxPwWkRnbECwctF1p5ZBwozC_Cwjy_Mk_8MzQRGP59tX3FKwbebTAfg1ctYxXvU5fhm1RCDpzFcRaQlVyp94rrsana7JpmKKTkwElmnA',
  activityDriverAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhhKmW6gETcfKGxXt6SuqY3awTSlSO_usJ0Z5K2uoU-UJtIjsFlnN4A9mawukR2Icr5D9P85LJpnsA6D7p_r4mWQLE1-pthAI_3GZlhW08PifGk5izom2Ijaal1PWXKDY1dfEzJ9EtyjW0lrOc2eGCHAX3K5HYHGWhmT5cdgilUO5B7bGynT7E0RlFyDIF-0dQB-Jo5p4nMAsD7myhDLYQndkNkeFX7fc0KL5mWhuQRRWxELcg2bmm-Q'
};

export const RIDE_OPTIONS: RideOption[] = [
  {
    id: 'economy',
    name: 'Ucab Economy',
    price: 12.40,
    eta: 3,
    seats: 4,
    features: '3 min away • 4 seats',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCol-b0tMrksrFFBD938xm9So2B2RSoVnIYLq5WT5T2GMjazCcIyBaT0qjWlNzB_f2N35LWlgT_aZNbg7faAiOt6OOdHiRaLJGJNE7FCHH1W1RIfQkaadpRsjmstP-mZ9CCAv6O5H_jhYoWcGD46lLJWC1m8g6oQLrfjqOPiDhxm-7FuimoyxqzKKV2jIaJVyI-cXgQ7s-CrikLXkQ5wzt7cXfypYdKBI-v_pqiNNhHUBJcUnwn3JTAlQ'
  },
  {
    id: 'luxury',
    name: 'Ucab Luxury',
    price: 28.90,
    eta: 5,
    seats: 5,
    features: 'Premium • 5 min away',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjW4_YUFMY6J7iVjQHKsroRhkxnWxvmDBXQOhXWtAM7Ppz2f-uQmCDTXQWugNfZfd2ankSH5PS-8AOB8z9q_fqfWBqNWG43dazg5LopIUibpBr7acguiNruillF56ys3JYmDBZt2Bm2X9x0bKv75okT7LAZTCAN8pYh2Ox96Su4SRB9hKqtVqTtBIeYtFTexwdNHmgHBVF7L1aRJN-63zdDBsA0jS1AvBuZ5XBIgrwEDwzuu8Z8JeXeg',
    tag: 'TOP CHOICE'
  },
  {
    id: 'prime',
    name: 'Ucab Prime',
    price: 19.50,
    eta: 8,
    seats: 4,
    features: 'Includes Snacks • 8 min away',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgVc0SdmiXm7p-zjiwgE15GthNDD6Z7R1ZLAGKE3fYA74qGVB34TRBChsGBomNoTZdEDE4Bj8cwoGY8dNURrN9JTQY0qYSftCOL7ghZHRoaHG0jHjOxuJStyB2fLQo0cIZ5_MEh7peCYPcrKLzVL5Sftx7b8c8dV-rUNM8zK8V4c0pUvhMduLpxgXurmtijk7Qyp0UDWiIwToHvVWH4SQ1hLlnG0DTNo4-uR59tKMLRo4nejwHyRrCBQ',
    hasSnacks: true
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    date: 'Oct 24, 2023',
    time: '14:30',
    type: 'Premium Sedan',
    price: 34.50,
    pickup: 'Grand Central Terminal, New York',
    destination: 'JFK International Airport',
    status: 'Completed',
    driverName: 'Robert Johnson',
    driverImage: HOTLINKED_IMAGES.activityDriverAvatar,
    icon: 'directions_car'
  },
  {
    id: 'act-2',
    date: 'Oct 22, 2023',
    time: '09:15',
    type: 'UCab Eco',
    price: 18.20,
    pickup: 'Brooklyn Heights Promenade',
    destination: 'The Metropolitan Museum of Art',
    status: 'Completed',
    donationAmount: 0.50,
    icon: 'electric_car'
  },
  {
    id: 'act-3',
    date: 'Oct 19, 2023',
    time: '18:45',
    type: 'Standard UCab',
    price: 22.00,
    pickup: 'Chelsea Market',
    destination: 'High Line Park Entrance',
    status: 'Completed',
    rating: 5,
    icon: 'commute'
  }
];

export const POPULAR_DESTINATIONS = [
  { name: 'Grand Central Terminal, NY', address: '89 E 42nd St, New York, NY 10017', distance: '1.2 mi' },
  { name: 'The Metropolitan Museum of Art', address: '1000 5th Ave, New York, NY 10028', distance: '3.4 mi' },
  { name: 'JFK International Airport', address: 'Queens, NY 11430', distance: '15.8 mi' },
  { name: 'Chelsea Market, New York', address: '75 9th Ave, New York, NY 10011', distance: '1.9 mi' },
  { name: 'High Line Park Entrance', address: 'Gansevoort St, New York, NY 10014', distance: '2.1 mi' },
  { name: 'Times Square, New York', address: 'Broadway, New York, NY 10036', distance: '0.8 mi' },
  { name: 'Central Park Zoo', address: 'East 64th St, New York, NY 10021', distance: '2.5 mi' },
  { name: 'Brooklyn Heights Promenade', address: 'Montague St, Brooklyn, NY 11201', distance: '5.1 mi' },
];
