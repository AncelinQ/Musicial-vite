//Main type with properties presents in User, Band and Ad
export interface IId {
  id?: Number;
}

export interface IEntity extends IId {
  name?: String;
  firstName?: String;
  lastName?: String;
  city: String;
  picture?: String;
  experience?: String; //may become mandatory
  objective?: String; //may become mandatory
  description?: String; //may become mandatory
  styles?: String[]; //may become mandatory
  audioLinks?: String[];
  videoLinks?: String[];
  websiteLinks?: String[];
  artistReferences?: String[];
  songReferences?: String[];
  adList?: IAd[];
  messageList?: IMessage[];
  favorites?: IEntity[];
}

export interface IUser extends IEntity {
  email: String;
  firstName: String;
  lastName: String;
  age: Number;
  gender: Number;
  instruments?: String[];
  bands?: IBand[];
}

export interface IBand extends IEntity {
  name: String;
  members: IUser[];
  since?: Date;
  contact?: String;
  formerName?: String;
}

export interface IItems {
  createdAt: Date;
  updatedAt?: Date;
  createdBy: IUser | IBand;
}

export interface IAd extends IItems, IEntity {
  content?: string;
  priority?: number;
  title: String;
  instruments?: String[];
}

export interface IMessage extends IItems, IId {
  recipient: IUser;
}
