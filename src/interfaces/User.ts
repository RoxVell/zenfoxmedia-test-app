import GeoLocation from './GeoLocation';

interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

export default interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}