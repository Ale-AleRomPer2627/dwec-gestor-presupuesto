
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};

// Muestra un valor de texto dentro de un elemento HTML.
function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);

    if (elemento) {
        elemento.textContent = valor;
    }
}

// Muestra un gasto dentro del elemento HTML indicado.
function mostrarGastoWeb(idElemento, gasto) {

    // Obtener el elemento HTML por su ID
    const elemento = document.getElementById(idElemento);

    // Verificar que el elemento y el gasto existen
    if (!elemento || !gasto) {
        return;
    }

    // Crear el HTML para las etiquetas del gasto
    const etiquetasHTML = gasto.etiquetas.map(etiqueta => {
        return `<span class="gasto-etiquetas-etiqueta">${etiqueta}</span>`;
    }).join('');

    // Crear el HTML para el gasto completo
    const gastoHTML = `
        <div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${new Date(gasto.fecha).toLocaleDateString()}</div>
            <div class="gasto-valor">${gasto.valor}</div>
            <div class="gasto-etiquetas">
                ${etiquetasHTML}
            </div>
        </div>
    `;

    // Añadir el HTML del gasto al elemento
    elemento.innerHTML += gastoHTML;
}

// Muestra los totales agrupados por día, mes o año.
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    // Obtener el elemento HTML por su ID
    const elemento = document.getElementById(idElemento);

    // Verificar que el elemento y la agrupación existen
    if (!elemento || !agrup) {
        return;
    }

    // Mapeo de los periodos a su representación en texto
    const periodosTexto = {
        dia: 'día',
        mes: 'mes',
        anyo: 'año'
    };

    // Obtener el texto correspondiente al periodo
    const periodoTexto = periodosTexto[periodo];

    // Crear el HTML para cada agrupación
    const agrupacionesHTML = Object.entries(agrup).map(([clave, total]) => {
        return `
            <div class="agrupacion-dato">
                <span class="agrupacion-dato-clave">${clave}</span>
                <span class="agrupacion-dato-valor">${total}</span>
            </div>
        `;
    }).join('');

    // Crear el HTML final para la agrupación y añadirlo al elemento
    elemento.innerHTML = `
        <div class="agrupacion">
            <h1>Gastos agrupados por ${periodoTexto}</h1>
            ${agrupacionesHTML}
        </div>
    `;
}
