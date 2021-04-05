export type User = {
  id: string;
  cognitoId: string;
  createdAt: string;
  email: string;
  firstName: string;
  lastName: string;
  updatedAt: string;
  phoneNumber: string;
};

export type ToDo = {
  id: string;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  description: string;
};

export type ObjectWithKey = {
  key: string;
  [x: string]: any;
};
export type ObjectWithId = {
  id: string;
  [x: string]: any;
};
