let gastos = [];
let idGasto = 0;
let presupuesto = 0;

// Función para validar que el valor es un número positivo
function validarValor(valor) {
    return typeof valor === "number" &&
        Number.isFinite(valor) &&
        valor >= 0;
}

// Función para actualizar el presupuesto
function actualizarPresupuesto(valor) {
    if (!validarValor(valor)) {
        return -1;
    }

    presupuesto = valor;
    return presupuesto;
}

// Función para mostrar el presupuesto actual
function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// Constructor para crear un gasto
function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {

    this.descripcion = descripcion;
    this.valor = validarValor(valor) ? valor : 0;

    // Inicializar la fecha
    let fechaParseada = typeof fecha === "string"
        ? Date.parse(fecha)
        : NaN;

    this.fecha = Number.isNaN(fechaParseada)
        ? Date.now()
        : fechaParseada;

    // Inicializar el array de etiquetas
    this.etiquetas = [];

    // Mostrar información básica del gasto
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    // Actualizar descripción
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
        return this.descripcion;
    };

    // Actualizar valor
    this.actualizarValor = function (nuevoValor) {
        if (validarValor(nuevoValor)) {
            this.valor = nuevoValor;
        }

        return this.valor;
    };

    // Actualizar fecha del gasto
    this.actualizarFecha = function (nuevaFecha) {
        let fechaParseada = Date.parse(nuevaFecha);

        if (!Number.isNaN(fechaParseada)) {
            this.fecha = fechaParseada;
        }

        return this.fecha;
    };

    // Añadir etiquetas sin permitir duplicados
    this.anyadirEtiquetas = function (...etiquetas) {
        etiquetas.forEach(etiqueta => {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        });

        return this.etiquetas;
    };

    // Borrar las etiquetas indicadas
    this.borrarEtiquetas = function (...etiquetas) {
        this.etiquetas = this.etiquetas.filter(
            etiqueta => !etiquetas.includes(etiqueta)
        );

        return this.etiquetas;
    };

    // Mostrar información completa del gasto
    this.mostrarGastoCompleto = function () {
        let gastoCompleto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:
`;

        this.etiquetas.forEach(etiqueta => {
            gastoCompleto += `- ${etiqueta}\n`;
        });

        return gastoCompleto;
    };

    // Obtener el periodo de agrupación según el criterio indicado
    this.obtenerPeriodoAgrupacion = function (periodo) {

        const fechaGasto = new Date(this.fecha);

        const anyo = fechaGasto.getFullYear();
        const mes = String(fechaGasto.getMonth() + 1).padStart(2, "0"); // Sumamos 1 al mes porque getMonth() comienza en 0
        const dia = String(fechaGasto.getDate()).padStart(2, "0"); // Usamos padStart para asegurarnos de que tenga dos dígitos

        if (periodo === "anyo") {
            return `${anyo}`;
        }

        if (periodo === "mes") {
            return `${anyo}-${mes}`;
        }

        if (periodo === "dia") {
            return `${anyo}-${mes}-${dia}`;
        }
    };

    this.anyadirEtiquetas(...etiquetas);
}



// Función para listar todos los gastos
function listarGastos() {
    return gastos;
}

// Función para añadir un gasto a la lista de gastos
function anyadirGasto(gasto) {
    if (gasto instanceof CrearGasto) {
        gasto.id = idGasto++;
        gastos.push(gasto);
        return true;
    }

    return false;
}

// Función para borrar un gasto por su ID
function borrarGasto(id) {
    const index = gastos.findIndex(gasto => gasto.id === id);

    if (index !== -1) {
        gastos.splice(index, 1);
        return true;
    }

    return false;
}

// Función para calcular el total de gastos
function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

// Función para calcular el balance actual
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

// Función para filtrar los gastos según un
function filtrarGastos(filtro) {

    return gastos.filter(gasto => {

        // Filtrar por descripción
        if (filtro.descripcionContiene &&
            !gasto.descripcion.toLowerCase().includes(
                filtro.descripcionContiene.toLowerCase()
            )) {
            return false;
        }

        // Filtrar por etiquetas
        if (filtro.etiquetasTiene &&
            filtro.etiquetasTiene.length > 0) {

            if (!filtro.etiquetasTiene.some(etiqueta =>
                gasto.etiquetas.includes(etiqueta))) {
                return false;
            }
        }

        // Filtrar por valor mínimo
        if (filtro.valorMinimo !== undefined &&
            gasto.valor < filtro.valorMinimo) {
            return false;
        }
        
        if (filtro.valorMaximo !== undefined &&
            gasto.valor > filtro.valorMaximo) {
            return false;
        }

        // Filtrar por fecha inicial
        if (filtro.fechaDesde) {
            const fechaDesde = new Date(filtro.fechaDesde);
            fechaDesde.setHours(0, 0, 0, 0);

            if (gasto.fecha < fechaDesde.getTime()) {
                return false;
            }
        }

        // Filtrar por fecha final
        if (filtro.fechaHasta) {
            const fechaHasta = new Date(filtro.fechaHasta);
            fechaHasta.setHours(23, 59, 59, 999);

            if (gasto.fecha > fechaHasta.getTime()) {
                return false;
            }
        }

        return true;
    });
}



function agruparGastos(
    periodo = "mes",
    etiquetas = [],
    fechaDesde,
    fechaHasta = new Date().toISOString().slice(0, 10)
) {
    // Primero filtramos los gastos
    const gastosFiltrados = filtrarGastos({
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    });

    // Después agrupamos los gastos filtrados
    return gastosFiltrados.reduce((acumulador, gasto) => {

        const clavePeriodo = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acumulador[clavePeriodo] === undefined) {
            acumulador[clavePeriodo] = 0;
        }

        acumulador[clavePeriodo] += gasto.valor;

        return acumulador;

    }, {});
}



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
