import React, { useEffect, useState } from "react";
import "./firststep.css";
import { useNavigate } from 'react-router-dom';
import { useFormContext } from "../context/FormContext";
import axios from 'axios'; 
import { usePetData } from "../context/petDataContext";





const FirstStep = () => {

  

  const [isMobile, setIsMobile] = useState(false);

  const [preciosData, setPreciosData] = useState([])
  const { updateData, clearData } = useFormContext();

  const checkMobileView = () => {
    setIsMobile(window.innerWidth <= 900);
  };

  const { clearDataPet } = usePetData();

  useEffect(() => {
    localStorage.removeItem('formData');
    clearData()
    clearDataPet()
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => {
      window.removeEventListener("resize", checkMobileView);
    };
  }, []);

  const navigate = useNavigate();

  const handlePlanSelection = (plan) => {
    updateData({ plan });
    navigate('/step2');
};

useEffect(() => {
  const getPrecios = async () => {
    try {
      const requestBody = {
        idPoliza: `${process.env.REACT_APP_POLIZA_ID}`
      };
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
      // console.log('URL:', `${process.env.REACT_APP_SERVER_URL}crm/getPrecios`);
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}crm/getPrecios`, requestBody, config);
      // console.log('respuesta', response);
      const opciones = response.data.resultado.ResponseTarget[0].Endosos[0].Endoso[0].Opciones[0].Opcion
      // console.log('opciones', opciones);
      const nroEndoso   = response.data.resultado.ResponseTarget[0].Endosos[0].Endoso[0].Nro[0]
      const OpcionesReales = [
        process.env.REACT_APP_OPCION_1, 
        process.env.REACT_APP_OPCION_2, 
        process.env.REACT_APP_OPCION_3
      ];

      // console.log(OpcionesReales);
      

      const filteredOpciones = opciones.filter(opcion => 
    
        OpcionesReales.includes(opcion.Nombre[0])
      );

      setPreciosData(filteredOpciones);
        // console.log(filteredOpciones);
      updateData({
                  preciosData: filteredOpciones,
                  Poliza:process.env.REACT_APP_POLIZA_ID,
                  Endoso:process.env.REACT_APP_POLIZA_ID+nroEndoso,
                })

      // console.log(preciosData?.[2]?.Premio?.[0]?.split('.')?.[0]);
      
    } catch (error) {
      console.error("Error fetching precios:", error);
    }
  };

  getPrecios();
}, []);

  return (
<div className="table_container">
      <img data-aos="fade-down" className="tittle_img" src="./images/tittle.png" alt="tittle" />
      <div className="banner_tittle_container">
        <h2 className={`second_tittle ${isMobile ? "mobile-text" : ""}`}>
          {isMobile ? "Todos nuestros planes incluyen" : "Que incluye?"}
        </h2>
        <div className="banner_container">
          <div className="banner_parrafo">
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
              className="first_number_list"
            >
              <img
                className="banners_img"
                src="./images/planbasico.png"
                alt="banner basico"
              />
         <p>1</p>
              <p>1</p>
              <p>Ilimitadas</p>
              <p>3</p>
              <p>2</p>
              <p>3</p>
              <p>1</p>
              <p>1</p>
              <p>2</p>
              <p>1</p>
              <p>1</p>
              <p>1</p>
              <p></p>
              <h4 className="sin_limites">Sin límite</h4>
              <h4 className="charge_number">${preciosData?.[0]?.Premio?.[0]?.split('.')?.[0] || ''}</h4>
          <h3 className='contract' onClick={() => handlePlanSelection('basic')}>Contratar</h3>
          </div>
          <div className="mobile_number_list">
              <p>Ilimitadas</p>
              <p>3</p>
              <p>2</p>
              <p>3</p>
              <p>1</p>
              <p>1</p>
              <p>2</p>
              <p>1</p>
              <p>1</p>
              <p>1</p>
              <p>1</p>
              <p>Ilimitadas</p>
            </div>
            <div
              className="number_column"
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                className="banners_img"
                src="./images/planpreferido.png"
                alt="banner preferido"
              />
              <p>2</p>
              <p>2</p>
              <p>Ilimitadas</p>
              <p>3</p>
              <p>2</p>
              <p>3</p>
              <p>1</p>
              <p>1</p>
              <p>2</p>
              <p>1</p>
              <p>1</p>
              <p>1</p>
              <p></p>
              <h4 className="sin_limites">Sin límite</h4>
              <h4 className="charge_number">${preciosData?.[1]?.Premio?.[0]?.split('.')?.[0] || ''}</h4>
          <h3 className='contract' onClick={() => handlePlanSelection('preferido')}>Contratar</h3>
          </div>
          <div className="third_number_column"
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                className="banners_img"
                src="./images/planfull.png"
                alt="banner full"
              />
              <p>3</p>
              <p>3</p>
              <p>Ilimitadas</p>
              <p>3</p>
              <p>2</p>
              <p>3</p>
              <p>1</p>
              <p>1</p>
              <p>2</p>
              <p>1</p>
              <p>1</p>
              <p>1</p>
              <p></p>
              <h4 className="sin_limites">Sin límite</h4>
              <h4 className="charge_number">${preciosData?.[2]?.Premio?.[0]?.split('.')?.[0] || ''}</h4>
          <h3 className='contract' onClick={() => handlePlanSelection('full')}>Contratar</h3>
          </div>
</div>
        </div>
      </div>

      <section className="plan_container">
        <div>
          <div className="desktop_list">
            <div className="plan_box">
              <div>
                <h4>Responsabilidad Civil</h4>
                <h5>Hasta $300.000.- al año</h5>
              </div>
            </div>

            <div className="plan_box">
              <div>
                <h4>
                  Eutanasia, vejez, cremación <br /> y retiro del cuerpo
                </h4>
                <h5>Hasta $7200.- por mascota</h5>
              </div>

              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Consultas veterinarias 24hs</h4>
                <h5>Ilimitado</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>
                  Consultas veterinarias <br /> en centro veterinario
                </h4>
                <h5>Hasta $2500.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>
                  Análisis y estudios en caso de <br /> enfermedad grave o
                  accidente
                </h4>
                <h5>Hasta $3500.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>
                  Consulta médica veterinaria <br /> a domicilio - chequeo
                  general
                </h4>
                <h5>Hasta $3000.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Intervención quirúrgica</h4>
                <h5>Hasta $1200.- por reintegro</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>
                  Consulta veterinaria con <br /> especialista (Control de
                  tratamiento)
                </h4>
                <h5>Hasta $6500.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Vacunación</h4>
                <h5>Hasta $2000.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Castración</h4>
                <h5>Hasta $4000.- por reintegro</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Guardería</h4>
                <h5>Hasta $4500.- por mascota</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Baño</h4>
                <h5>Incluye corte</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <h4>
                Descuentos en accesorios
                <br /> y alimentos hasta el 20%{" "}
              </h4>
              <hr />
            </div>
          </div>

          <div className="mobile_list">
            <div className="plan_box">
              <div>
                <h4>Consultas veterinarias 24hs</h4>
                <h5>Consultas veterinarias por videollamada</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Consultas veterinarias en centro veterinario</h4>
                <h5>Hasta $3500.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>
                  Analisis y estudios en caso de <br /> enfermedad grave o accidente
                </h4>
                <h5>Hasta $5500.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Consultas veterinarias 24hs</h4>
                <h5>Consultas veterinarias por videollamada</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>
                  Consulta médica veterinaria <br /> a domicilio - chequeo
                  general
                </h4>
                <h5>Hasta $3000.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Intervención quirúrgica</h4>
                <h5>Hasta $13500.- por reintegro</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>
                  Consulta veterinaria con <br /> especialista (Control de
                  tratamiento)
                </h4>
                <h5>Hasta $6500.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Vacunación</h4>
                <h5>Hasta $2000.- por evento</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Castración</h4>
                <h5>Hasta $4000.- por reintegro</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Guardería</h4>
                <h5>Hasta $4500.- por mascota</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <div>
                <h4>Baño</h4>
                <h5>Incluye corte</h5>
              </div>
              <hr />
            </div>

            <div className="plan_box">
              <h4>
                Descuentos en accesorios
                <br /> y alimentos hasta el 20%{" "}
              </h4>
              <hr />
            </div>
          </div>
          
          <section className="plan_container_mobile">       
          <div className="plan_box_mobile_1">
            <h2 className="plan_box_tittle_1">Plan Básico</h2>
            <h2 className="plan_box_price">${preciosData?.[0]?.Premio?.[0]?.split('.')?.[0] || ''}.-</h2>
            <p>Mensual</p>
            <div className="box_items">
              <div className="box_items_h4">
              <h4 style={{color:"#021187",fontWeight:"900"}}>Responsabilidad Civil</h4>
              <h4 className="parrafo_box" style={{color:"white",fontWeight:"100", lineHeight:"1px"}}>Hasta $300.000.- por mascota</h4>
              </div>
              <h4 className="number_items" style={{color:"#021187"}}>1</h4>
            </div>
            <div className="box_items">
              <div className="box_items_h4">
              <h4 style={{color:"#021187"}}>Eutanasia, vejez, cremación y <br />retiro del cuerpo</h4>
              <h4 style={{color:"white",fontWeight:"100", lineHeight:"1px"}}>Hasta $9000.- por mascota</h4>
              </div>
              <h4 className="number_items" style={{color:"#021187", marginLeft:"50px"}}>1</h4>
            </div>
            <div className="btn_text_mobile">
            <a style={{textDecoration:"none"}} href="./step2"><h3 className="contratar_btn_1">Contratar →</h3></a>
            <p>📞Prefiero que me llamen</p>
            </div>
          </div>

          <div className="plan_box_mobile_2">
            <h2 className="plan_box_tittle_2">Plan Preferido</h2>
            <h2 className="plan_box_price">${preciosData?.[1]?.Premio?.[0]?.split('.')?.[0] || ''}.-</h2>
            <p>Mensual</p>
            <div className="box_items">
              <div className="box_items_h4">
              <h4 style={{color:"#021187",fontWeight:"900"}}>Responsabilidad Civil</h4>
              <h4 style={{color:"#021187",fontWeight:"100", lineHeight:"1px"}}>Hasta $300.000.- por mascota</h4>
              </div>
              <h4 className="number_items" style={{color:"#021187"}}>2</h4>
            </div>
            <div className="box_items">
              <div className="box_items_h4">
              <h4 style={{color:"#021187"}}>Eutanasia, vejez, cremación y <br />retiro del cuerpo</h4>
              <h4 style={{color:"#021187",fontWeight:"100", lineHeight:"1px"}}>Hasta $9000.- por mascota</h4>
              </div>
              <h4 className="number_items" style={{color:"#021187", marginLeft:"50px"}}>2</h4>
            </div>
            <div className="btn_text_mobile">
            <a style={{textDecoration:"none"}} href="./step2"><h3 className="contratar_btn_2">Contratar →</h3></a>
            <p>📞Prefiero que me llamen</p>
            </div>
          </div>

          <div className="plan_box_mobile_3">
            <h2 className="plan_box_tittle_3">Plan Full</h2>
            <h2 className="plan_box_price" style={{color:"#2AFEB2"}}>${preciosData?.[2]?.Premio?.[0]?.split('.')?.[0] || ''}.-</h2>
            <p>Mensual</p>
            <div className="box_items">
              <div className="box_items_h4">
              <h4 style={{color:"#2AFEB2",fontWeight:"900"}}>Responsabilidad Civil</h4>
              <h4 style={{color:"#2AFEB2",fontWeight:"100", lineHeight:"1px"}}>Hasta $300.000.- por mascota</h4>
              </div>
              <h4 className="number_items" style={{color:"#2AFEB2"}}>3</h4>
            </div>
            <div className="box_items">
              <div className="box_items_h4">
              <h4 style={{color:"#2AFEB2"}}>Eutanasia, vejez, cremación y <br />retiro del cuerpo</h4>
              <h4 style={{color:"#2AFEB2",fontWeight:"100", lineHeight:"1px"}}>Hasta $9000.- por mascota</h4>
              </div>
              <h4 className="number_items" style={{color:"#2AFEB2", marginLeft:"50px"}}>3</h4>
            </div>
            <div className="btn_text_mobile">
            <a style={{textDecoration:"none"}} href="./step2"><h3 className="contratar_btn_3">Contratar →</h3></a>
            <p>📞Prefiero que me llamen</p>
            </div>
          </div>
          </section> 

          <div className="contract_box">
            <h3 className="call_text">Prefiero que me llamen</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FirstStep;
