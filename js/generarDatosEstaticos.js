
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

// 1. Actualizamos el presupuesto a 1500 €
gestionPresupuesto.actualizarPresupuesto(1500);

// Mostramos el presupuesto
gestionPresupuestoWeb.mostrarDatoEnId(
    'presupuesto',
    gestionPresupuesto.mostrarPresupuesto()
);

// Generamos new para crear un nuevo objeto de gasto y lo añadimos al gestor de presupuesto
const gasto1 = new gestionPresupuesto.CrearGasto(
    'Compra carne',
    23.44,
    '2021-10-06',
    'casa',
    'comida'
);

const gasto2 = new gestionPresupuesto.CrearGasto(
    'Compra fruta y verdura',
    14.25,
    '2021-09-06',
    'supermercado',
    'comida'
);

const gasto3 = new gestionPresupuesto.CrearGasto(
    'Bonobús',
    18.60,
    '2020-05-26',
    'transporte'
);

const gasto4 = new gestionPresupuesto.CrearGasto(
    'Gasolina',
    60.42,
    '2021-10-08',
    'transporte',
    'gasolina'
);

const gasto5 = new gestionPresupuesto.CrearGasto(
    'Seguro hogar',
    206.45,
    '2021-09-26',
    'casa',
    'seguros'
);

const gasto6 = new gestionPresupuesto.CrearGasto(
    'Seguro coche',
    195.78,
    '2021-10-06',
    'transporte',
    'seguros'
);

// Creamos un array con todos los gastos y los añadimos al gestor de presupuesto
const gastos = [gasto1, gasto2, gasto3, gasto4, gasto5, gasto6];

// Recorremos el array de gastos y los añadimos al gestor de presupuesto
gastos.forEach(gasto => {
    gestionPresupuesto.anyadirGasto(gasto);
});

// Mostramos el total de gastos y el balance
gestionPresupuestoWeb.mostrarDatoEnId(
    'gastos-totales',
    gestionPresupuesto.calcularTotalGastos()
);

// Mostramos el balance actual
gestionPresupuestoWeb.mostrarDatoEnId(
    'balance-total',
    gestionPresupuesto.calcularBalance()
);

// Mostramos el listado completo de gastos
const listadoCompleto = gestionPresupuesto.listarGastos();

listadoCompleto.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb(
        'listado-gastos-completo',
        gasto
    );
});

// Filtramos los gastos de septiembre de 2021
const gastosFiltrados1 = gestionPresupuesto.filtrarGastos({
    fechaDesde: new Date('2021-09-01').getTime(),
    fechaHasta: new Date('2021-10-01').getTime() - 1
});

gastosFiltrados1.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb(
        'listado-gastos-filtrado-1',
        gasto
    );
});

// Filtramos los gastos de más de 50 €
const gastosFiltrados2 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 50.01
});

gastosFiltrados2.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb(
        'listado-gastos-filtrado-2',
        gasto
    );
});

// Filtramos los gastos de más de 200 € con etiqueta "seguros"
const gastosFiltrados3 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 200.01,
    etiquetasTiene: ['seguros']
});

// Mostramos los gastos filtrados en el HTML
gastosFiltrados3.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb(
        'listado-gastos-filtrado-3',
        gasto
    );
});

// Filtramos los gastos de menos de 50 €, que tengan la etiqueta "comida" o "transporte"
const gastosFiltrados4 = gestionPresupuesto.filtrarGastos({
    valorMaximo: 49.99,
    etiquetasTiene: ['comida', 'transporte']
});

// Mostramos el listado de gastos filtrados en el HTML
gastosFiltrados4.forEach(gasto => {
    gestionPresupuestoWeb.mostrarGastoWeb(
        'listado-gastos-filtrado-4',
        gasto
    );
});

// Agrupamos los gastos por día
const gastosPorDia = gestionPresupuesto.agruparGastos('dia');

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    'agrupacion-dia',
    gastosPorDia,
    'dia'
);

// Agrupamos los gastos por mes
const gastosPorMes = gestionPresupuesto.agruparGastos('mes');

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    'agrupacion-mes',
    gastosPorMes,
    'mes'
);

// Agrupamos los gastos por año
const gastosPorAnyo = gestionPresupuesto.agruparGastos('anyo');

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    'agrupacion-anyo',
    gastosPorAnyo,
    'anyo'
);
