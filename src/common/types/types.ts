import { FaunaEntity, FaunaPage } from './fauna';

export interface User extends FaunaEntity {
  email?: string;
  password?: string;
  role?: Role;
  firstName?: string;
  lastName?: string;
}

export interface Artist extends FaunaEntity {
  adminUser?: User;
  city?: string;
  name?: string;
  objectives?: string;
  experience?: string;
  influences?: FaunaPage<Influence>;
  styles?: FaunaPage<ArtistStyle>;
  ads?: FaunaPage<Ad>;
  instrument?: Instrument;
}

export interface Musician extends FaunaEntity, Artist {
  band?: Band;
}

export interface Band extends FaunaEntity, Artist {
  members?: FaunaPage<Musician>;
}

export interface Ad extends FaunaEntity {
  author?: Artist;
  title?: string;
  description?: string;
  instrument?: Instrument;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Influence extends FaunaEntity {
  style?: string;
  refArtist?: string;
}

export interface ArtistStyle extends FaunaEntity {
  style?: Style;
  artist?: Artist;
}
export interface Style extends FaunaEntity {
  name?: string;
}

export interface Instrument extends FaunaEntity {
  name?: string;
}

export interface AuthPayload {
  token: string;
  adminUser: User;
}

export enum Role {
  Admin,
  User,
  Guest,
}

export enum ResourceIdentifier {
  Musician = 'Musician',
  Band = 'Band',
}

// export interface User extends FaunaEntity {
//   name?: String;
//   firstName?: String;
//   lastName?: String;
//   city: String;
//   picture?: String;
//   experience?: String; //may become mandatory
//   objective?: String; //may become mandatory
//   description?: String; //may become mandatory
//   styles?: String[]; //may become mandatory
//   audioLinks?: String[];
//   videoLinks?: String[];
//   websiteLinks?: String[];
//   artistReferences?: String[];
//   songReferences?: String[];
//   adList?: IAd[];
//   messageList?: IMessage[];
//   favorites?: IEntity[];
// }

// export interface IUser extends IEntity {
//   email: String;
//   firstName: String;
//   lastName: String;
//   age: Number;
//   gender: Number;
//   instruments?: String[];
//   bands?: IBand[];
// }

// export interface IBand extends IEntity {
//   name: String;
//   members: IUser[];
//   since?: Date;
//   contact?: String;
//   formerName?: String;
// }

// export interface IItems {
//   createdAt: Date;
//   updatedAt?: Date;
//   createdBy: IUser | IBand;
// }

// export interface IAd extends IItems, IEntity {
//   content?: string;
//   priority?: number;
//   title: String;
//   instruments?: String[];
// }

// export interface IMessage extends IItems, FaunaEntity {
//   recipient: IUser;
// }
