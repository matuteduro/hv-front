import React, {useEffect, useState} from "react";
import axios from "axios";


const PetDataSection = ({ index,
    isCatSelected,
    isDogSelected,
    handleCatChange,
    handleDogChange,
    nombre,
    onNombreChange,
    edad,
    onEdadChange,
    raza,
    onRazaChange,
    genero,
    onGeneroChange,
    isValidationTriggered,
    isCheckboxValid, }) => {
        const displayIndex = index + 1;

  const [razas, setRazas] = useState([]);

  useEffect(() => {
        const fetchRazas = async () => {
            try {
                const requestBody = {
                    nombreRegistro: "Razas"
                };
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}crm/getRegistros`, requestBody, config);
                setRazas(response.data.resultado.ResponseTarget);  // Assuming the response contains the razas directly. Adjust if needed.
                // console.log(razas);

                
            } catch (error) {
                console.error("Error fetching razas:", error);
            }
        };

        fetchRazas();
  }, []);

  const filteredRazas = razas.filter(raza => {
    if (isDogSelected) {
        return raza.Descripcion[0] === "Perro";
    } else if (isCatSelected) {
        return raza.Descripcion[0] === "Gato";
    }
    return true;  // If neither dog nor cat is selected, no razas are shown.
});


  return (
    <div>
      <h3 style={{ color: "#2AFEB2"}}>Datos de la mascota {displayIndex}</h3>
      <div className="input_process">
          <div className="input_box_2">
            <div className="input_box">
              <h3>Nombre de la mascota</h3>
              <input className="inputs_larger" type="text"  value={nombre}
              onChange={(event) => onNombreChange(event.target.value)}
              style={{
                border: isValidationTriggered && !nombre ? "1px solid red" : ""
              }}/>
            </div>
          </div>

          <div className="especie_container">
      <h3 style={{ fontWeight: "300", color: isCheckboxValid ? "#021187" : "red"}}>
        ¿De qué especie es tu hijo peludo?
      </h3>
      <div className="cat_dog_box_img">
        <div>
          <img src="./images/cat.png" alt="gatito icono" />
          <div className="cat_box">
            <input
              type="checkbox"
              checked={isCatSelected}
              onChange={handleCatChange}
            />
            <p>Gato</p>
          </div>
        </div>
        <div>
          <img src="./images/dog.png" alt="perrito icono" />
          <div className="cat_box">
            <input
              type="checkbox"
              checked={isDogSelected}
              onChange={handleDogChange}
            />
            <p>Perro</p>
          </div>
        </div>
      </div>
    </div>

          <div className="input_box_2" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <div className="genero_edad" style={{display:"flex", gap:"10px"}}>
            <div className="input_box">
              <h3>Edad</h3>
              <input className="shorter_inputs" type="text" value={edad}
              onChange={(event) => onEdadChange(event.target.value)}
              style={{
                border: isValidationTriggered && !edad ? "1px solid red" : ""
              }}/>
              <p className="parrafo_telefono" >*Recordá que la protección no es valida para <br />mascotas de 10 años o más.</p>
            </div>
            <div className="input_box">
              <h3>Género</h3>
              <select value={genero}
              onChange={(event) => onGeneroChange(event.target.value)}
              style={{
                border: isValidationTriggered && !genero ? "1px solid red" : ""
              }}>
                <option value="">Seleccionar</option>
                <option value="Masculino">Macho</option>
                <option value="Femenino">Hembra</option>
              </select>
            </div></div>
            <div className="input_box_7">
            <h3>Raza</h3>
            <select 
                className="inputs_larger"
                value={raza} 
                onChange={(event) => onRazaChange(event.target.value)} 
                style={{
                    border: isValidationTriggered && !raza ? "1px solid red" : ""
                }}>
                <option value="">Seleccionar</option>
                {filteredRazas.map((razaOption) => (
                    <option key={razaOption.Nombre[0]} value={razaOption.Nombre[0]}>
                        {razaOption.Nombre[0]}
                    </option>
                ))}
            </select>
        </div>

          </div>
        </div>
    </div>
  );
};

export default PetDataSection;
