/**
 * Temporary data fetching to make the component go brrr.
 */

/** */
export interface IUser {
  username: string;
  avatar: {
    thumbnail: string;
    original: string;
    modification: number;
  };
}

export async function getUser(): Promise<IUser> {
  return {
    username: 'xXxFloofaYxGamerxXx',
    avatar: {
      thumbnail: '',
      original: '',
      modification: 0,
    },
  };
}

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

export async function getSchedule(): Promise<{
  _embedded: {
    events: IEvent[];
    locations: ILocation[];
  };
}> {
  // using
  //   mitmdump -H '/~s/Access-Control-Allow-Origin/*' -H '/~s/Cache-Control/max-age=3600' -m reverse:https://fluufff.org@localhost:8080
  const res = await fetch('http://localhost:8080/website/api/v1/schedule');
  return await res.json();
}
