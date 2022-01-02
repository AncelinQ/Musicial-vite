import { IAd, IBand, IUser } from '../components/types/types';

export const Users: IUser[] = [
  {
    id: 1,
    firstName: 'Michel',
    lastName: 'Michelon',
    email: 'mich.mich@fake.co',
    age: 24,
    gender: 1,
    instruments: ['guitare', 'basse'],
    city: 'Lyon',
    description: "Salut c'est Michel, bla bla bla",
    artistReferences: ['Deep Purple', 'Iron Maiden'],
    songReferences: ['Stairway to Heaven', 'Highway to Hell'],
    styles: ['Metal', 'Pop'],
  },
  {
    id: 2,
    firstName: 'Philippe',
    lastName: 'Philippou',
    email: 'ptiphilou@fake.co',
    age: 21,
    gender: 1,
    instruments: ['clavier', 'flûte'],
    city: 'Paris',
    description: "Salut c'est Philou",
    styles: ['Rock', 'Rap'],
    artistReferences: ['IAM', 'NTM'],
    songReferences: ['Ma Benz', 'Le Mia'],
  },
];

export const Bands: IBand[] = [
  {
    id: 1,
    name: 'Lorem',
    members: [Users[0]],
    city: 'Lyon',
    description: 'On fait du gros métal bourrin, mais avec des sentiments.',
    styles: ['metal', 'Indie'],
    artistReferences: ['Cannibal Corpse', 'Craddle of Filth'],
    songReferences: ['Hammer Smashed Face', 'Place des Grands Hommes'],
  },
  {
    id: 2,
    name: 'Ipsum',
    members: [Users[1]],
    city: 'Paris',
    description: 'Musique éclectique.',
    styles: ['Rock', 'Cumbia'],
    artistReferences: ['Téléphone', 'Quantic'],
    songReferences: ['Satisfaction', 'Chan Chan'],
  },
];

Users[0].bands = [Bands[0]];
Users[1].bands = [Bands[1]];

export const Ads: IAd[] = [
  {
    id: 1,
    title: 'Recherche Guitariste',
    description: 'Salut on recherche un guitariste',
    instruments: ['guitare'],
    styles: ['métal'],
    priority: 1,
    city: 'Paris',
    createdAt: new Date('2021-10-05'),
    createdBy: Bands[1],
  },
  {
    id: 2,
    title: 'Recherche groupe de Metal',
    description: 'Salut je recherche un groupe de métal',
    city: 'Lyon',
    priority: 0,
    createdAt: new Date('2021-10-15'),
    createdBy: Users[1],
  },
];
