export type InitialStateType = {
  errors: {
    errorTitle: string;
    errorAuthor: string;
    errorUrl: string;
    success?: boolean;
  };
  values: {
    title: string;
    author: string;
    url: string;
    success?: boolean;
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

export type ReadingListType = {
  id: number;
  userId: number;
  read: boolean;
  blogId: number;
  blog: { title: string; author: string; url: string } | null;
};
