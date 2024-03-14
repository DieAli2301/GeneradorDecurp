import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import QRCode from 'qrcode.react';
import './App.css';

function App() {
  const [verificationCode, setVerificationCode] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [nombre, setNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [sexo, setSexo] = useState('');
  const [entidadFederativa, setEntidadFederativa] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [numeroAleatorio, setNumeroAleatorio] = useState(null);
  const [curpQR, setCurpQR] = useState('');


 

  const obtenerDigitoVerificador = (curpParcial) => {
    const equivalencias = {
      '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15, 'G': 16, 'H': 17, 'I': 18,
      'J': 19, 'K': 20, 'L': 21, 'M': 22, 'N': 23, 'Ñ': 24, 'O': 25, 'P': 26, 'Q': 27,
      'R': 28, 'S': 29, 'T': 30, 'U': 31, 'V': 32, 'W': 33, 'X': 34, 'Y': 35, 'Z': 36
    };

    const multiplicadores = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1, 1]; 

    let suma = 0;
    for (let i = 0; i < curpParcial.length; i++) {
      const caracter = curpParcial.charAt(i);
      suma += equivalencias[caracter] * multiplicadores[i];
    }

    const residuo = suma % 10;
    return (10 - residuo) % 10;
  };

  const generarNumeroAleatorio = () => {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    setNumeroAleatorio(randomNum);
  };

  const handleCalcular = () => {
    if (!primerApellido || !segundoApellido || !nombre || !sexo || !entidadFederativa || !fechaNacimiento) {
      alert('Por favor completa todos los campos antes de calcular la CURP.');
      return;
    }

    if (!numeroAleatorio || numeroAleatorio % 2 !== 0) {
      alert('Por favor genera un número aleatorio par primero.');
      return;
    }

   

    const añoNacimiento = fechaNacimiento.getFullYear().toString().substring(2);
    let mesNacimiento = (fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
    let diaNacimiento = fechaNacimiento.getDate().toString().padStart(2, '0');

    const primeraLetraPrimerApellido = primerApellido.charAt(0).toUpperCase();
    const primeraVocalPrimerApellido = obtenerPrimeraVocal(primerApellido);
    const primeraLetraSegundoApellido = segundoApellido.charAt(0).toUpperCase();
    const primeraLetraNombre = obtenerPrimeraConsonanteNombre(nombre[0], segundoNombre[0])
    
    
    

    const letraSexo = sexo === 'H' ? 'H' : 'M';

    const abreviaturasEntidades = {
      'Aguascalientes': 'AS', 'Baja California': 'BC', 'Baja California Sur': 'BS', 'Campeche': 'CC',
      'Coahuila': 'CL', 'Colima': 'CM', 'Chiapas': 'CS', 'Chihuahua': 'CH', 'Ciudad de México': 'DF',
      'Durango': 'DG', 'Guanajuato': 'GT', 'Guerrero': 'GR', 'Hidalgo': 'HG', 'Jalisco': 'JC',
      'Estado de México': 'MC', 'Michoacán': 'MN', 'Morelos': 'MS', 'Nayarit': 'NT', 'Nuevo León': 'NL',
      'Oaxaca': 'OC', 'Puebla': 'PL', 'Querétaro': 'QT', 'Quintana Roo': 'QR', 'San Luis Potosí': 'SP',
      'Sinaloa': 'SL', 'Sonora': 'SR', 'Tabasco': 'TC', 'Tamaulipas': 'TS', 'Tlaxcala': 'TL',
      'Veracruz': 'VZ', 'Yucatán': 'YN', 'Zacatecas': 'ZS'
    };

    const abreviaturaEntidadFederativa = abreviaturasEntidades[entidadFederativa];

    if (!abreviaturaEntidadFederativa) {
      alert('Por favor selecciona una entidad federativa válida.');
      return;
    }

    const curpParcial = `${primeraLetraPrimerApellido}${primeraVocalPrimerApellido}${primeraLetraSegundoApellido}${primeraLetraNombre}${añoNacimiento}${mesNacimiento}${diaNacimiento}${letraSexo}${abreviaturaEntidadFederativa}`;
    const digitoVerificador = obtenerDigitoVerificador(curpParcial);
    const consonantePrimerApellido = obtenerPrimeraConsonantePrimerApellido(primerApellido);
    const consonanteSegundoApellido = obtenerSegundaConsonanteSegundoApellido(segundoApellido);
    const segundaConsonanteNombre = obtenerSegundaConsonante(nombre);
    const curpCompleta = `${curpParcial}${consonantePrimerApellido}${consonanteSegundoApellido}${segundaConsonanteNombre}${digitoVerificador}`;

    alert(`Tu CURP es: ${curpCompleta}`);

    const curpQR = curpCompleta;

  
  setCurpQR(curpQR);

    
    
  };

  const obtenerPrimeraVocal = (apellido) => {
    const vocales = ['A', 'E', 'I', 'O', 'U','À', 'È', 'Ì', 'Ò', 'Ù'];
    let vocalEncontrada = true;
    for (let i = 1; i < apellido.length; i++) {
        const letra = apellido[i].toUpperCase();
        if (!vocalEncontrada && vocales.includes(letra)) {
            vocalEncontrada = false;
        } else if (vocalEncontrada && vocales.includes(letra)) {
            return letra;
        }
    }
    return ''; 
};

const obtenerPrimeraConsonanteNombre = () => {
  let primeraConsonante = '';
  let primerNombreGenerar = nombre.toUpperCase();
  
  if (primerNombreGenerar === 'MARIA' || primerNombreGenerar === 'JOSE') {
    
      primerNombreGenerar = segundoNombre.toUpperCase();
    
      for (let letra of segundoNombre) {
        if (['A', 'E', 'I', 'O', 'U','À', 'È', 'Ì', 'Ò', 'Ù'].includes(letra)) {
          primeraConsonante = letra;
          break;
        }
      }
    
  } else {
    // Si el primer nombre no es 'MARIA' o 'JOSE', se busca la primera consonante del primer nombre.
    for (let letra of primerNombreGenerar) {
      if (!['A', 'E', 'I', 'O', 'U','À', 'È', 'Ì', 'Ò', 'Ù'].includes(letra)) {
        primeraConsonante = letra;
        break;
      }
    }
  }

  return primeraConsonante; 
};







 
const obtenerPrimeraConsonantePrimerApellido = (apellido) => {
  const vocales = ['A', 'E', 'I', 'O', 'U','À', 'È', 'Ì', 'Ò', 'Ù'];
  let primeraConsonante = '';
  let encontradaConsonante = false;
  
  for (let i = 1; i < apellido.length; i++) {
      let letra = apellido[i].toUpperCase();
      if (!vocales.includes(letra) && !encontradaConsonante) {
          primeraConsonante = letra;
          encontradaConsonante = true;
      }
  }
  
  return primeraConsonante;
};

const obtenerSegundaConsonante = (nombre) => {
  let consonantesEncontradas = 0;
  
  for (let letra of nombre.toUpperCase()) {
    if (!['A', 'E', 'I', 'O', 'U','À', 'È', 'Ì', 'Ò', 'Ù'].includes(letra)) {
      consonantesEncontradas++;
      if (consonantesEncontradas === 2) {
        return letra;
      }
    }
  }

  return ''; 
};





const obtenerSegundaConsonanteSegundoApellido = (segundoApellido) => {
  const vocales = ['A', 'E', 'I', 'O', 'U','À', 'È', 'Ì', 'Ò', 'Ù'];
  let consonanteEncontrada = false;
  let primeraVocalEncontrada = false;
  
  for (let letra of segundoApellido.toUpperCase()) {
    if (!vocales.includes(letra) && consonanteEncontrada) {
      return letra;
    } else if (!vocales.includes(letra)) {
      consonanteEncontrada = true;
    } else if (!primeraVocalEncontrada) {
      primeraVocalEncontrada = true;
      consonanteEncontrada = true; 
    }
  }
  
  return '';
};



  const handleLimpiar = () => {
    setVerificationCode('');
    setPrimerApellido('');
    setSegundoApellido('');
    setNombre('');
    setSexo('');
    setEntidadFederativa('');
    setFechaNacimiento(null);
  };

  return (
    <div className="App">
       <div className="qr-code">
        <QRCode value={`https://www.google.com/search?q=${curpQR}`} bgColor="#f2f2f2" />
      </div>
      <div className="verification">
        <h2>Ingresa tu código de verificación</h2>
        <input
           type="text"
           value={verificationCode}
           onChange={(e) => setVerificationCode(e.target.value)}
           disabled={!numeroAleatorio}
        />
        <button onClick={generarNumeroAleatorio}>Generar Número Aleatorio</button>
        {numeroAleatorio && <p>Número Aleatorio Generado: {numeroAleatorio}</p>}
      <div className="data-input" style={{ opacity: numeroAleatorio ? 1 : 0.5 }}>
      </div>
      </div>
      <div className="data-input">
        <h2>Ingresa tus datos</h2>
        <div>
          <label>Primer Apellido:</label>
          <input type="text" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} />
        </div>
        <div>
          <label>Segundo Apellido:</label>
          <input type="text" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Segundo Nombre:</label>
          <input type='text' value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value)} />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <DatePicker
            selected={fechaNacimiento}
            onChange={(date) => setFechaNacimiento(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona la fecha"
          />
        </div>
        <div>
          <label>Sexo:</label>
          <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
            <option value="">Selecciona</option>
            <option value="H">Hombre</option>
            <option value="M">Mujer</option>
            <option value="N">No binario</option>
          </select>
        </div>
        <div>
          <label>Entidad Federativa de Nacimiento:</label>
          <select value={entidadFederativa} onChange={(e) => setEntidadFederativa(e.target.value)}>
            <option value="">Selecciona</option>
            <option value="Aguascalientes">Aguascalientes</option>
            <option value="Baja California">Baja California</option>
            <option value="Baja California Sur">Baja California Sur</option>
            <option value="Campeche">Campeche</option>
            <option value="Chiapas">Chiapas</option>
            <option value="Chihuahua">Chihuahua</option>
            <option value="Coahuila">Coahuila</option>
            <option value="Colima">Colima</option>
            <option value="Ciudad de México">Ciudad de México</option>
            <option value="Durango">Durango</option>
            <option value="Guanajuato">Guanajuato</option>
            <option value="Guerrero">Guerrero</option>
            <option value="Hidalgo">Hidalgo</option>
            <option value="Jalisco">Jalisco</option>
            <option value="Estado de México">Estado de México</option>
            <option value="Michoacán">Michoacán</option>
            <option value="Morelos">Morelos</option>
            <option value="Nayarit">Nayarit</option>
            <option value="Nuevo León">Nuevo León</option>
            <option value="Oaxaca">Oaxaca</option>
            <option value="Puebla">Puebla</option>
            <option value="Querétaro">Querétaro</option>
            <option value="Quintana Roo">Quintana Roo</option>
            <option value="San Luis Potosí">San Luis Potosí</option>
            <option value="Sinaloa">Sinaloa</option>
            <option value="Sonora">Sonora</option>
            <option value="Tabasco">Tabasco</option>
            <option value="Tamaulipas">Tamaulipas</option>
            <option value="Tlaxcala">Tlaxcala</option>
            <option value="Veracruz">Veracruz</option>
            <option value="Yucatán">Yucatán</option>
            <option value="Zacatecas">Zacatecas</option>
          </select>
        </div>
        <div className="buttons">
          <button onClick={handleCalcular}>Calcular CURP</button>
          <button onClick={handleLimpiar}>Limpiar</button>
        </div>
      </div>
    </div>
  );
}

export default App;




