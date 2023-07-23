import { agregarAlCarrito } from "./carrito.js";

export const productos = [];
const url="./productos.json";
function obtenerProductos(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        productos.push(...data);
        cargarProductos(productos);
    })
    .catch(err => console.error(err));
    return productos;
};
const retornarCardsHtml = (producto) => {
    return `
    <div class="card">
        <div class="card-image">${producto.imagen}</div>
        <div class="card-name">${producto.nombre}</div>
        <div class="card-price">$${producto.precio}</div>
        <div class="card-button">
            <button class="button button-outline button-add" id="${producto.id}" title="Clic para agregar al carrito">+</button>
        </div>
    </div>`;
};
const cargarProductos = (array) => {
    const container = document.querySelector('.container');
    if(container!=null){
        array.forEach((producto) => {
            const productsCards = retornarCardsHtml(producto);
            container.innerHTML += productsCards;
        });
    }
    activarClickEnBotones();
};
const activarClickEnBotones = () =>{
    const botonesAgregar = document.querySelectorAll(".button.button-outline.button-add");
    if(botonesAgregar !== null){
        for(let boton of botonesAgregar){
            boton.addEventListener('click', (event)=>{
                const frutaId = parseInt(event.target.id);
                agregarAlCarrito(frutaId);
            });
        }
    }
};
const main = () =>{
    obtenerProductos()
};
main();