import { ReactNode, useEffect, useState } from 'react';
import { SelectsDataContext } from '../contexts/selects-data-context';
import useDataEntities, { DataEntities } from '../hooks/general/use-data-entities/use-data-entities';

interface props {
  children: ReactNode;
}
export function SelectsDataProvider({ children }: props) {
    const [selectsData, setSelectsData] = useState<DataEntities | {}>({}); 
    const {getData} = useDataEntities()
    useEffect(() => {
        const fetchData = async () => {
            try{
                const result = await getData()
                setSelectsData(result)
            }catch(err){
                console.log(err)
                setSelectsData({})
            }
            
        }
        fetchData()
    }, [])

    return(
        <SelectsDataContext.Provider value={{selectsData, setSelectsData}}>
            {children}
        </SelectsDataContext.Provider>
    )
}