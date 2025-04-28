import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseLogin {
  getUserByEmail: (email: string) => Promise<{ email: string, ID_user: number, role: "admin" | "main" | "user" } | null>;
  getUsers: () => Promise<{ email: string, ID_user: number, role: "admin" | "main" | "user" }[]>;
  createUser: (email: string, role: string) => Promise<{ email: string, ID_user: number, role: "admin" | "main" | "user" }>;
  editUser: (id: number, email: string, role: string) => Promise<AxiosResponse<any, any>>;
  deleteUser: (id: number) => Promise<AxiosResponse<any, any>>;
}

export function useLogin(): UseLogin {
  const host = useContext(ApiHostContext)
  async function getUserByEmail(email: string) {
    const res = await axios.get(`${host}/data-entities/user`, {
      params: {
        email: email
      }
    })
    if (res.data) return res.data
    else return null

  }
  async function getUsers() {
    const res = await axios.get(`${host}/data-entities/user`)
    if (res.data) return res.data
    else return []
  }

  async function createUser(email: string, role: string) {
    const res = await axios.post(`${host}/data-entities/user`, {
      email: email,
      role: role
    })
    if (res.data) return res.data
    else return null

  }

  async function editUser(id: number, email: string, role: string) {
    const res = await axios.put(`${host}/data-entities/user/${id}`, {
      email: email,
      role: role
    })
    console.log(res)
    return res
  }

  async function deleteUser(id: number){
    const res = await axios.delete(`${host}/data-entities/user/${id}`)
    return res
  }
  return {
    getUsers,
    getUserByEmail,
    createUser,
    deleteUser,
    editUser
  };
}

export default useLogin;
