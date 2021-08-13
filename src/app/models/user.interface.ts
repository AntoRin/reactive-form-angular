export class Users {
    firstName!: string;
    lastName!: string;
    email?: string;
    gender?: string;
    address!: {
      street?: string;
      city?: string;
      state?: string;
      zip?: number;
    };
  }