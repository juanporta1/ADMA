import { useState, useCallback, useContext } from 'react';
import { Setting } from '../../../types/data-entities.types';
import axios from 'axios';
import { ApiHostContext } from '../../../contexts/api-host-context';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseSettings {
  getSetting: (settingName?: string) => Promise<Setting[]>;
  updateSetting: (setting: Setting) => Promise<void>;
}

export function useSettings(): UseSettings {
  const host = useContext(ApiHostContext)
  const getSetting = async (settingName ?: string) => {
    const res = await axios.get(`${host}/data-entities/setting`,{
      params: {
        settingName: settingName
      }
    });
    return res.data;
  }

  const updateSetting = async (setting: Setting) => {
    await axios.patch(`${host}/data-entities/setting`, setting);
  }
  return {getSetting, updateSetting};
}

export default useSettings;
