import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseLogin {
  getUserByEmail: (email: string) => Promise<User | null>;
  getUsers: () => Promise<User[]>;
  createUser: (email: string, role: "main" | "admin" | "user") => Promise<User>;
  editUser: (user: User) => Promise<AxiosResponse<any, any>>;
  deleteUser: (id: number) => Promise<AxiosResponse<any, any>>;
}
export interface User {
  ID_user: number;
  email: string;
  role: 'main' | 'admin' | 'user';
  inUse: boolean;
}

export function useLogin(): UseLogin {
  const host = useContext(ApiHostContext);
  async function getUserByEmail(email: string) {
    const res = await axios.get(`${host}/data-entities/user`, {
      params: {
        email: email,
      },
    });
    if (res.data) return res.data;
    else return null;
  }
  async function getUsers() {
    const res = await axios.get(`${host}/data-entities/user`);
    if (res.data) return res.data;
    else return [];
  }

  async function createUser(email: string, role: "main" | "admin" | "user") {
    const existingUser = await getUserByEmail(email);
    if (existingUser !== null) {
      return await editUser({
        ID_user: existingUser.ID_user,
        email: existingUser.email,
        role: role,
        inUse: true,
      });
    } else {
      const res = await axios.post(`${host}/data-entities/user`, {
        email: email,
        role: role,
      });
      if (res.data) return res.data;
      else return null;
    }
  }

  async function editUser(user: User) {
    const res = await axios.put(`${host}/data-entities/user/${user.ID_user}`, {
      email: user.email,
      role: user.role,
      inUse: user.inUse,
    });
    console.log(res);
    return res.data;
  }

  async function deleteUser(id: number) {
    const res = await axios.delete(`${host}/data-entities/user/${id}`);
    return res;
  }
  return {
    getUsers,
    getUserByEmail,
    createUser,
    deleteUser,
    editUser,
  };
}

export default useLogin;
