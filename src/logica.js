const handleCalcular = () => {
    // Verificar que todos los campos estén llenos antes de calcular la CURP
    if (!primerApellido || !segundoApellido || !nombre || !sexo || !entidadFederativa || !fechaNacimiento) {
      alert('Por favor completa todos los campos antes de calcular la CURP.');
      return;
    }

    // Paso 1: Obtener la primera letra del primer apellido
    const primeraLetraPrimerApellido = primerApellido.charAt(0).toUpperCase();

    // Paso 2: Obtener la primera vocal del primer apellido (excluyendo las primeras letras que pueden ser compuestas)
    const primerVocalPrimerApellido = primerApellido.slice(1).split('').find(letra => 'aeiou'.includes(letra.toLowerCase())) || 'X';

    // Paso 3: Obtener la primera letra del segundo apellido
    const primeraLetraSegundoApellido = segundoApellido.charAt(0).toUpperCase();

    // Paso 4: Obtener la primera letra del nombre
    const primeraLetraNombre = nombre.charAt(0).toUpperCase();

    // Paso 5: Obtener la fecha de nacimiento en el formato YYMMDD
    const fechaNacimientoFormato = obtenerFechaNacimiento(fechaNacimiento);

    // Paso 6: Obtener el sexo
    const letraSexo = sexo === 'H' ? 'H' : 'M'; // H: Hombre, M: Mujer

    // Paso 7: Obtener la abreviatura de la entidad federativa
    const abreviaturaEntidadFederativa = entidadFederativa; // La abreviatura ya está seleccionada

    // Paso 8: Calcular el dígito verificador
    const digitos = `${primeraLetraPrimerApellido}${primerVocalPrimerApellido}${primeraLetraSegundoApellido}${primeraLetraNombre}${fechaNacimientoFormato}${letraSexo}${abreviaturaEntidadFederativa}`;

    const sumaDigitos = digitos.split('').reduce((total, caracter) => {
        // Si el caracter es un número, se suma su valor numérico, de lo contrario, se suma 0
        const valorCaracter = isNaN(caracter) ? (caracter.charCodeAt(0) - 'A'.charCodeAt(0)) + 10 : parseInt(caracter);
        return total + valorCaracter;
    }, 0);

    // Se obtiene el residuo de la suma de los dígitos entre 10
    const residuo = sumaDigitos % 10;

    // Se resta el residuo de 10
    let digitoVerificador = 10 - residuo;

    // Si el residuo es 0, entonces el dígito verificador es 0
    if (residuo === 0) {
        digitoVerificador = 0;
    }

    // Paso 9: Construir la CURP
    const curp = `${primeraLetraPrimerApellido}${primerVocalPrimerApellido}${primerLetraSegundoApellido}${primerLetraNombre}${fechaNacimientoFormato}${letraSexo}${abreviaturaEntidadFederativa}${digitoVerificador}`;

    alert(`Tu CURP es: ${curp}`);
};
