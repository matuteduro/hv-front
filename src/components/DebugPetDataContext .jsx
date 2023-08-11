import { useFormContext } from "../context/FormContext";
import { usePetData } from "../context/petDataContext";


const DebugPetDataContext = () => {
    
  const petDataContextValue = usePetData();
  const formDataContextValue = useFormContext();

  return (
    <div>
    <h3>Pet Data Context:</h3>
    <pre>{JSON.stringify(petDataContextValue, null, 2)}</pre>

    <h3>Form Data Context:</h3>
    <pre>{JSON.stringify(formDataContextValue, null, 2)}</pre>
  </div>
  );
};

export default DebugPetDataContext;
