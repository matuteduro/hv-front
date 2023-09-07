import React, { createContext, useContext, useEffect, useState } from 'react';

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
    const initialData = localStorage.getItem('formData') 
    ? JSON.parse(localStorage.getItem('formData'))
    : {};

    const [formData, setFormData] = useState(initialData);

    const updateData = (newData) => {
        setFormData((prevData) => ({ ...prevData, ...newData }));
    };

    // Store data in localStorage whenever formData changes
    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    return (
        <FormContext.Provider value={{ formData, updateData }}>
            {children}
        </FormContext.Provider>
    );
};