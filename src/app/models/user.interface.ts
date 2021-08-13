export class Users {
    firstName!: string;
    lastName!: string;
    email?: string;
    contact?: number;
    gender?: string;
    address!: {
      street?: string;
      city?: string;
      state?: string;
      zip?: number;
    };
  }