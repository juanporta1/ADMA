import axios from 'axios';
import { useState, useCallback, useContext } from 'react';
import { ApiHostContext } from '../../../contexts/api-host-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseLogin {
  getUserByEmail: (email: string) => Promise<{email: string, ID_user: number, role: "admin" | "main" | "user"} | null>;
  getUsers: () => Promise<{email: string, ID_user: number, role: "admin" | "main" | "user"}[]>;
}

export function useLogin(): UseLogin {
  const host = useContext(ApiHostContext)
  async function getUserByEmail(email: string) {
      const res = await axios.get(`${host}/data-entities/user`,{
        params: {
          email: email
        }
      })
      if(res.data) return res.data
      else return null
      
  }
  async function getUsers() {
    const res = await axios.get(`${host}/data-entities/user`)
    if(res.data) return res.data
    else return []
  }
  return {
    getUsers,
    getUserByEmail,
  };
}

export default useLogin;
