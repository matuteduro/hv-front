import React, { useEffect } from "react";
import "./fourthstep.css";
import { usePetData } from "../context/petDataContext";
import { useFormContext } from "../context/FormContext";
import { sendDataToServer } from "../helpers/apiHelper";

const FourthStep = () => {

  const { petSections } = usePetData();
  const { formData } = useFormContext();

  useEffect(() => {
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
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`;

    sendDataToServer(petSections, formData, currentDate, opcion)
      .then(response => {
        // console.log("Data successfully sent to server.");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []); 

  return (
    <div className="fourthstep1">
      <div className="fourthstep">
        <div className="final_step_container">
          <div className="text_banner">
            <div className="texts_container">
              <h2 data-aos="fade-down">¡ Gracias por elegirnos ! </h2>
              <p>
                A continuación recibiras un correo de bienvenida con los pasos a
                seguir para utilizar el seguro
              </p>
            </div>
            <div className="btn_text">
              <a href="https://holavet.com.ar/" style={{textDecoration:"none"}}><h3 className="inicio_btn">Volver al Inicio</h3></a>
              <div className="text2_container">
                <h4>¿Necesitas Ayuda?</h4>
                <div className="whatsapp_box">
                  <img src="./images/whatsapp.png" alt="whatsapp icon" />
                  <a href="https://wa.me/1140830075" target="blank"><h5 style={{color:"#021187"}}>Escribínos</h5></a>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="img_catdog_box">
            <img src="./images/dogandcat.png" alt="perro y gato imagen" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthStep;
