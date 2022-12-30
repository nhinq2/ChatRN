import moment from 'moment';
const DATA = [
  {
    id: 1,
    name: 'John Kempler',
    message: 'How to meet that special so...',
    created_at: moment().valueOf(),
    read: false,
    isOnline: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar.png?alt=media&token=350be7a5-3692-40ae-83cf-870b207baba1',
  },
  {
    id: 2,
    name: 'Andreas, Kirsten',
    message: 'Barbecue party tips for a tr...',
    created_at: moment().add(10, 'minutes').valueOf(),
    read: false,
    isOnline: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-6.png?alt=media&token=44815c0f-1d9a-450b-aa3c-48e0266cea72',
  },
  {
    id: 3,
    name: 'Erik Ekstrom Bothman',
    message: 'Shared a video',
    created_at: moment().add(15, 'minutes').valueOf(),
    read: false,
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-5.png?alt=media&token=06b736ec-6d49-4c18-a39b-45a2f3195141',
  },
  {
    id: 4,
    name: 'Randy Curtis',
    message: 'Sounds good!',
    created_at: moment().add(1, 'days').valueOf(),
    isOnline: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-4.png?alt=media&token=8925166b-7921-4079-b77a-91b069546004',
  },
  {
    id: 5,
    name: 'Haylie Botosh',
    message: 'How to meet that special...',
    created_at: moment().add(2, 'days').valueOf(),
    isOnline: true,
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-3.png?alt=media&token=6d3a3ae4-7047-47b6-a421-67908e1c00dc',
  },
  {
    id: 6,
    name: 'Marcus Philips',
    message: 'Got it girl!',
    created_at: moment().add(1, 'weeks').valueOf(),
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-2.png?alt=media&token=420786a2-20e6-4724-9483-7bf12c29ebee',
  },
  {
    id: 7,
    name: 'Zen group USA',
    message: 'Barbecue party tips for a...',
    created_at: moment().add(2, 'weeks').valueOf(),
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-1.png?alt=media&token=98445454-c594-4d59-ac78-20d0b311617b',
  },
  {
    id: 8,
    name: 'Makenna Carder',
    message: 'Its so easy to do that',
    created_at: moment().add(1, 'months').valueOf(),
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-7.png?alt=media&token=1176ed94-7073-442f-80b0-16955e9ebe80',
  },
  {
    id: 9,
    name: 'Haylie Westervelt',
    message: 'How to meet that special...',
    created_at: moment().add(2, 'months').valueOf(),
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-7.png?alt=media&token=1176ed94-7073-442f-80b0-16955e9ebe80',
  },
  {
    id: 10,
    name: 'Livia Culhane',
    message: 'Hey I was wondering abo...',
    created_at: moment().add(1, 'years').valueOf(),
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-8.png?alt=media&token=b971b791-e3fb-4de3-83e6-ab931be46b2a',
  },
  {
    id: 11,
    name: 'Christina',
    message: 'Hope everybody had a great weekend!!',
    created_at: moment().add(10, 'minutes').valueOf(),
    thread_id: '38gthHqOkZsdUqFvQ6v7',
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-9.png?alt=media&token=ec8e8afe-37f3-4662-96e3-34d333098ac6',
  },
  {
    id: 12,
    name: 'Alphons',
    message:
      'I took a short Meditation 101 class Monday and this ties right in with it. Perfect timing!',
    created_at: moment().add(15, 'minutes').valueOf(),
    thread_id: '38gthHqOkZsdUqFvQ6v7',
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-8.png?alt=media&token=b971b791-e3fb-4de3-83e6-ab931be46b2a',
  },
  {
    id: 13,
    name: 'Christina',
    message:
      'Thank you. Brought mindful suggestions for my next hike. Hope everybody had a great weekend!!',
    created_at: moment().add(20, 'minutes').valueOf(),
    thread_id: '38gthHqOkZsdUqFvQ6v7',
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-9.png?alt=media&token=ec8e8afe-37f3-4662-96e3-34d333098ac6',
  },
  {
    id: 14,
    name: 'Alphons',
    message:
      'I took a short Meditation 101 class Monday and this ties right in with it. Perfect timing!',
    created_at: moment().add(15, 'minutes').valueOf(),
    thread_id: '7MVDprS61ZS3RCtPRpZZ',
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-9.png?alt=media&token=ec8e8afe-37f3-4662-96e3-34d333098ac6',
  },
  {
    id: 15,
    name: 'Christina',
    message:
      'Thank you. Brought mindful suggestions for my next hike. Hope everybody had a great weekend!!',
    created_at: moment().add(20, 'minutes').valueOf(),
    thread_id: '7MVDprS61ZS3RCtPRpZZ',
    image:
      'https://firebasestorage.googleapis.com/v0/b/chatrn-f60d0.appspot.com/o/Avatar-9.png?alt=media&token=ec8e8afe-37f3-4662-96e3-34d333098ac6',
  },
];

export default DATA;
