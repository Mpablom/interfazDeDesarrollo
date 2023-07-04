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
    array.forEach((producto) => {
        const productsCards = retornarCardsHtml(producto);
        container.innerHTML += productsCards;
    });
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
    cargarProductos(productos);
};
main();