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
function CrearGasto(descripcion, valor) {

    this.descripcion = descripcion;
    this.valor = validarValor(valor) ? valor : undefined;

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
        return this.descripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (validarValor(nuevoValor)) {
            this.valor = nuevoValor;
        }

        return this.valor;
    };
}

// Función para listar todos los gastos
function listarGastos() {
    if (gastos.length === 0) {
        return "No hay gastos registrados.";
    }

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
    calcularBalance
}
