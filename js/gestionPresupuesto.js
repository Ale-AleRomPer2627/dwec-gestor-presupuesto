let presupuesto = 0;
function actualizarPresupuesto(valor) {
    //Comprobamos si el valor no es negativo
    if (typeof valor !== "number" || !Number.isFinite(valor) || valor <= 0) {
        return -1;
    }
    presupuesto = valor;
    return presupuesto;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}


function CrearGasto(descripcion, valor) {
    // 1. Propiedades
    this.descripcion = descripcion;

    // Validación del valor inicial
    if (typeof valor !== "number" || !Number.isFinite(valor) || valor <= 0) {
        this.valor = 0;
    } else {
        this.valor = valor;
    }

    // 2. Métodos
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
        return this.descripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (
            typeof nuevoValor === "number" &&
            Number.isFinite(nuevoValor) &&
            nuevoValor >= 0
        ) {
            this.valor = nuevoValor;
        }

        return this.valor;
    };
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
