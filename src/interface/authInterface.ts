export interface userSign {
  username?: string;
  password?: string;
  name?: string;
  confirmPassword?: string;
}

export interface userStateInterface {
  userId: string;
  userName: string;
  accessToken: string;
  setUserId: (userId: string) => void;
  setUserName: (userNickName: string) => void;
  setAccessToken: (token: string) => void;
}
