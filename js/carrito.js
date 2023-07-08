
const agregarAlCarrito = (frutaId) =>{
    if(frutaId > 0){
        const busqueda = productos.find(producto => producto.id === frutaId);
        if(busqueda != undefined){
            carritoFrutas.push(busqueda);
            almacenarCarrito(carritoFrutas);
        }
    }
};
const almacenarCarrito = (carritoFrutas) =>{
    if(carritoFrutas && carritoFrutas.length > 0){
        localStorage.carritoFrutas = JSON.stringify(carritoFrutas);
    }else {
        localStorage.removeItem('carritoFrutas');
      }
};
const recuperarCarrito = ()=>{
    let carritoFrutas= JSON.parse(localStorage.getItem('carritoFrutas')) || [];
    return carritoFrutas;
}
const carritoFrutas = recuperarCarrito();