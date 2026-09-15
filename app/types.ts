export type InitialStateType = {
  errors: {
    errorTitle: string;
    errorAuthor: string;
    errorUrl: string;
  };
  values: {
    title: string;
    author: string;
    url: string;
  };
};

export type UserInitialStateType = {
  errors: {
    name: string | null;
    username: string | null;
    password: string | null;
    passwordConfirm: string | null;
  };
  values: {
    name: string;
    username: string;
    password: string;
    passwordConfirm: string;
  };
};
