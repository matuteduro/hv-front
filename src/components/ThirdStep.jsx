import React, { useEffect, useState } from "react";
import "./thirdstep.css";
import PetDataSection from "./PetDataSection";
import { usePetData } from "../context/petDataContext";
// import { useNavigate} from "react-router-dom";
import { sendDataToServer } from "../helpers/apiHelper";
import { useFormContext } from "../context/FormContext";
import axios from 'axios';




const SecondStep = () => {
  // const navigate = useNavigate();

  const { petSections, setPetSections } = usePetData(); // Use the context
  const { formData} = useFormContext();
  const [isValidationTriggered, setIsValidationTriggered] = useState(false);
  const [isCheckboxValid, setIsCheckboxValid] = useState(false);
  const showPetSection = petSections.length >= 3;


  const isFormComplete = petSections.every(pet => pet.nombre && pet.genero && pet.raza && (pet.isCatSelected || pet.isDogSelected));

  const handleAddPetSection = () => {
    const newIndex = petSections.length + 1;
    setPetSections([...petSections, { index: newIndex }]);
  };

  const handleRemoveLastPetSection = () => {
    if (petSections.length > 0) {
        const newPetSections = petSections.slice(0, -1);
        setPetSections(newPetSections);
    }
};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePetInputChange = (index, field, value) => {
    const updatedPetSections = petSections.map((pet, i) => {
      if (i === index) {
        return { ...pet, [field]: value };
      }
      return pet;
    });
    setPetSections(updatedPetSections);
  };

  const handleCatChange = (index) => {
    const updatedPetSections = petSections.map((pet, i) => {
      if (i === index) {
        return { ...pet, isCatSelected: true, isDogSelected: false };
      }
      return pet;
    });
    setPetSections(updatedPetSections);
  
  };

  const handleDogChange = (index) => {
    const updatedPetSections = petSections.map((pet, i) => {
      if (i === index) {
        return { ...pet, isCatSelected: false, isDogSelected: true };
      }
      return pet;
    });
    setPetSections(updatedPetSections);
  };

  const handleContinue = () => {
    const isComplete = petSections.every(pet => pet.nombre && pet.genero && pet.raza);
    setIsValidationTriggered(true);


    
    const isCheckboxSelected = petSections.some(pet => pet.isCatSelected || pet.isDogSelected);

    setIsCheckboxValid(isCheckboxSelected);

    if (isComplete && isCheckboxSelected) {
      const petSectionsCount = petSections.length;

      let plan;
      let opcion;
      if (petSectionsCount === 1) {
          plan = 'Basico';
          opcion = formData.preciosData[0].Nombre
      } else if (petSectionsCount === 2) {
          plan = 'Preferido';
          opcion = formData.preciosData[1].Nombre
      } else if (petSectionsCount >= 3) {
          plan = 'Full';
          opcion = formData.preciosData[2].Nombre
      }

        const date = new Date();
        const year = date.getFullYear();
        const month = (1 + date.getMonth()).toString().padStart(2, '0'); // months are 0-based in JS
        const day = date.getDate().toString().padStart(2, '0');
        
        const currentDate = `${year}-${month}-${day}`

      // console.log('cantidad mascotas', petSectionsCount);
      // console.log(formData);
      const realAmount = Number(formData.preciosData[petSectionsCount - 1].Premio[0].split('.')[0]);
      // console.log('cantidad cuota', realAmount);

      // console.log(currentDate);
      // console.log(opcion);
      sendDataToServer(petSections, formData, currentDate, opcion)
        .then(response => {
          // console.log("Data sent successfully. Server response:", response);
          // console.log(process.env.REACT_APP_SERVER_URL);
          return axios.post(`${process.env.REACT_APP_SERVER_URL}mercadoPago/subscription/new`, {
            email: formData.email,
            amount: realAmount,
            plan: plan
          });
        })
        .then(axiosResponse => {
          // console.log("Axios post request successful. Server response:", axiosResponse.data);
          window.location.href = axiosResponse.data.link;
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } else {
      // console.log("Data is not complete or checkbox is not selected");
    }
  };

  return (
    <div className="second_step">
      <div className="process_container">
        <h2>Proceso de contratacion</h2>
        <ul className="process_list">
          <li>
            <span style={{ padding: "6px 17px" }}>1</span> Datos de titular
          </li>
          <li style={{ color: "#021187" }}>
            <span style={{ border: "solid #021187 1px" }}>2</span> Datos de
            mascotas
          </li>
          <li>
            <span>3</span> Pago
          </li>
          <li>
            <span>4</span> Confirmación
          </li>
        </ul>
      </div>

      <div className="input_section">
        <h2 data-aos="fade-down" style={{ color: "#021187" }}>
          Completá los datos de las mascotas
        </h2>
        <p>
          Completá los datos de la mascota o las mascotas dependiendo del plan
          que hayas elegido{" "}
        </p>
        <div className="input_process">
          <div>
            {petSections.map((section, index) => (
              <PetDataSection
                key={section.index}
                index={index}
                isCatSelected={section.isCatSelected}
                isDogSelected={section.isDogSelected}
                handleCatChange={() => handleCatChange(index)}
                handleDogChange={() => handleDogChange(index)}
                nombre={section.nombre}
                onNombreChange={(value) =>
                  handlePetInputChange(index, "nombre", value)
                }
                edad={section.edad}
                onEdadChange={(value) =>
                  handlePetInputChange(index, "edad", value)
                }
                raza={section.raza}
                onRazaChange={(value) =>
                  handlePetInputChange(index, "raza", value)
                }
                genero={section.genero}
                onGeneroChange={(value) =>
                  handlePetInputChange(index, "genero", value)
                }
                isValidationTriggered={isValidationTriggered}
                isCheckboxValid={isCheckboxValid}
              />
            ))}

              {!showPetSection && (
                <>
                  <button
                    onClick={handleAddPetSection}
                    style={{ fontSize: "24px", marginTop: "80px", width: "30px" }}
                  >
                    +
                  </button>
                </>
              )}

              {petSections.length >= 2 && (
                <button
                  onClick={handleRemoveLastPetSection}
                  style={{
                    fontSize: "24px",
                    marginTop: "80px",
                    marginLeft: "10px",
                    width: "30px"
                  }}
                >
                  -
                </button>
              )}
            <h5>Agregar otras mascotas</h5>
          </div>

          <h3 className="process_continue" onClick={handleContinue}>
            Continuar →
          </h3>
          {!isFormComplete && isValidationTriggered && (
            <p className="warning">Complete todos los campos por favor</p>
          )}
          <a href="https://api.whatsapp.com/send?phone=5491138522435&text=Quiero%20contratar">
            <h3 style={{ color: "#021187", textDecoration: "underline" }}>
              Hablar con un asesor
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
