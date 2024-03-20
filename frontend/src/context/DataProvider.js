import { createContext, useState } from 'react';

export const DataContext = createContext();


const DataProvider = ({ children }) => {
    const [checklistArr, setChecklistArr] = useState([]);
    const [cardsArr, setCardsArr] = useState([]);
    const [showToast, setShowToast] = useState(false);


    return (
        <DataContext.Provider value={{ checklistArr, setChecklistArr, cardsArr, setCardsArr, showToast, setShowToast }} >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;
