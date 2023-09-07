import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./secondstep.css";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "../context/FormContext";

const SecondStep = () => {
  
  
  const navigate = useNavigate();
  
  const { formData, updateData } = useFormContext();
  
  const [selectedDate, setSelectedDate] = useState(formData.selectedDate || null);
  const [nombre, setNombre] = useState(formData.nombre);
  const [apellido, setApellido] = useState(formData.apellido);
  const [tipoDocumento, setTipoDocumento] = useState(formData.tipoDocumento);
  const [dni, setDni] = useState(formData.dni);
  const [genero, setGenero] = useState(formData.genero || 'Masculino');
  const [telefono, setTelefono] = useState(formData.telefono);
  const [email, setEmail] = useState(formData.email);
  const [direccion, setDireccion] = useState(formData.direccion);
  const [localidad, setLocalidad] = useState(formData.localidad);
  const [codigoPostal, setCodigoPostal] = useState(formData.codigoPostal);
  const [isFormComplete, setIsFormComplete] = useState(true);
  const [isValidationTriggered, setIsValidationTriggered] = useState(false);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  };

  const handleContinue = () => {
    const formInputs = document.querySelectorAll(
      ".input_box input, .input_box select"
    );
    let isComplete = true;
    formInputs.forEach((input) => {
      if (!input.value) {
        isComplete = false;
        input.classList.add("incomplete");
      } else {
        input.classList.remove("incomplete");
      }
    });

    setIsValidationTriggered(true);
    setIsFormComplete(isComplete);

    if (!isComplete) {
      return;
    }

    console.log('genero es', genero);
    let sexoTitular;
    if (genero === "Masculino") {
        sexoTitular = 100000001;
    } else if (genero === "Femenino") {
        sexoTitular = 100000000;
    }

    let TipoDocumentoTitular;
    switch (tipoDocumento) {
        case "DNI":
            TipoDocumentoTitular = 1;
            break;
        case "Pasaporte":
            TipoDocumentoTitular = 100000000;
            break;
        case "Cedula":
            TipoDocumentoTitular = 100000001;
            break;
        default:
            // Handle other cases or defaults if required
            break;
    }

        // Update form data in context
        updateData({
          selectedDate,
          nombre,
          apellido,
          tipoDocumento,
          dni,
          genero,
          telefono,
          email,
          direccion,
          localidad,
          codigoPostal,
          sexoTitular,
          TipoDocumentoTitular
      });
  
      // Navigate without passing the state
      navigate("/step3");
  };

  return (
    <div className="second_step">
      <div className="process_container">
        <h2>Proceso de contratacion</h2>
        <ul className="process_list">
          <li style={{ color: "#021187" }}>
            <span style={{ border: "solid #021187 1px", padding: "6px 17px" }}>
              1
            </span>{" "}
            Datos de titular
          </li>
          <li>
            <span>2</span> Datos de mascotas
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
          Completá los datos del titular
        </h2>

        <div className="input_process">
          <div className="input_box_2">
            <div className="input_box">
              <h3>Nombre*</h3>
              <input
                className="shorter_inputs"
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                style={{
                  border:
                    isValidationTriggered && !nombre ? "1px solid red" : "",
                }}
              />
            </div>
            <div className="input_box">
              <h3>Apellido*</h3>
              <input
                className="shorter_inputs"
                type="text"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                style={{
                  border:
                    isValidationTriggered && !apellido ? "1px solid red" : "",
                }}
              />
            </div>
          </div>

          <div className="input_box_2">
            <div className="input_box">
              <h3>Tipo de Documento</h3>
              <select
                value={tipoDocumento}
                onChange={(event) => {
                  setTipoDocumento(event.target.value);
                  setIsValidationTriggered(false); // Reset validation trigger when the selection changes
                }}
                style={{
                  border:
                    isValidationTriggered && !tipoDocumento
                      ? "1px solid red"
                      : "",
                }}
              >
                <option value="">Seleccionar tipo de documento</option>
                <option value="DNI">DNI</option>
                <option value="Cedula">Cédula</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>

            <div className="input_box">
              <h3>{tipoDocumento ? tipoDocumento : "Documento"}</h3>
              <input
                className="shorter_inputs"
                type="text"
                value={dni}
                onChange={(event) => setDni(event.target.value)}
                style={{
                  border: isValidationTriggered && !dni ? "1px solid red" : "",
                }}
              />
            </div>
          </div>

          <div className="input_box_2">
            <div className="input_box">
              <h3>Fecha de Nacimiento*</h3>
              <DatePicker
                className="shorter_inputs"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                placeholderText="DD/MM/AAAA"
                wrapperClassName={
                  isValidationTriggered && !selectedDate ? "incomplete" : ""
                }
              />
            </div>
            <div className="input_box">
              <h3>Género*</h3>
              <select
                value={genero}
                onChange={(event) => setGenero(event.target.value)}
                style={{
                  border:
                    isValidationTriggered && !genero ? "1px solid red" : "",
                }}
              >
                <option value="" disabled defaultValue>
                  Selecciona una opción
                </option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>

          <div className="input_box_2">
            <div className="input_box">
              <h3>Tel. celular (codigo de area + num)*</h3>
              <input
                className="inputs_larger"
                type="text"
                onKeyPress={handleKeyPress}
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
                style={{
                  border:
                    isValidationTriggered && !telefono ? "1px solid red" : "",
                }}
              />
              <p className="parrafo_telefono">
                Incluí el código de área + el número de teléfono. Sólo números.
                Ej. 11 12345678
              </p>
            </div>
          </div>

          <div className="input_box_2">
            <div className="input_box">
              <h3>Email*</h3>
              <input
                className="inputs_larger"
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{
                  border:
                    isValidationTriggered && !email ? "1px solid red" : "",
                }}
              />
            </div>
          </div>

          <div className="input_box_2">
            <div className="input_box">
              <h3>Dirección*</h3>
              <input
                className="inputs_larger"
                type="text"
                value={direccion}
                onChange={(event) => setDireccion(event.target.value)}
                style={{
                  border:
                    isValidationTriggered && !direccion ? "1px solid red" : "",
                }}
              />
            </div>
          </div>

          <div className="input_box_2">
            <div className="input_box">
              <h3>Localidad</h3>
              <input
                className="shorter_inputs"
                type="text"
                value={localidad}
                onChange={(event) => setLocalidad(event.target.value)}
                style={{
                  border:
                    isValidationTriggered && !localidad ? "1px solid red" : "",
                }}
              />
            </div>
            <div className="input_box">
              <h3>Código Postal</h3>
              <input
                className="shorter_inputs"
                type="text"
                value={codigoPostal}
                onChange={(event) => setCodigoPostal(event.target.value)}
                style={{
                  border:
                    isValidationTriggered && !codigoPostal
                      ? "1px solid red"
                      : "",
                }}
              />
            </div>
          </div>

          <h3 className="process_continue" onClick={handleContinue}>
            Continuar →
          </h3>
          {!isFormComplete && isValidationTriggered && (
            <p className="warning">Complete todos los campos por favor</p>
          )}
          <a href="https://api.whatsapp.com/send?phone=5491138522435&text=Quiero%20contratar">
            <h3
              style={{
                color: "#021187",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Hablar con un asesor
            </h3>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SecondStep;
