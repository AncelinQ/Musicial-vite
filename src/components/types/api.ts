import { FaunaEntity, FaunaPage } from './fauna';

export interface User extends FaunaEntity {
  email?: string;
  password?: string;
}

export interface Artist extends FaunaEntity {
  city?: string;
  objectives?: string;
  experience?: string;
  influences?: FaunaPage<Influence>;
  ads?: FaunaPage<Ad>;
}

export interface Musician extends FaunaEntity, Artist {
  user?: User;
  firstName?: string;
  lastName?: string;
  band?: Band;
  instrument?: Instrument;
}

export interface Band extends FaunaEntity, Artist {
  admin?: User;
  name?: string;
  members?: FaunaPage<Musician>;
}

export interface Ad extends FaunaEntity {
  author?: Artist;
  title?: string;
  description?: string;
}

export interface Influence extends FaunaEntity {
  style?: string;
  refArtist?: string;
  refSong?: string;
}

export interface Instrument extends FaunaEntity {
  name?: string;
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
