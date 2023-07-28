export interface ILocation {
  locid: string;
  description: string;
  name: string;
  image?: string;
}

export interface IEventDescription {
  description: string;
  desid: string;
  image: string;
  name: string;
  // Mebbe this can be an ENUM?
  schedule: string;
}

export interface IEvent {
  begin: string;
  end: string;
  description: IEventDescription;
  location: ILocation;
  image?: string;
  reason?: string;
  // Mebbe this can be an ENUM?
  state: string;
}
