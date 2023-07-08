const table = document.querySelector('.table');

const retornarTablaHTML=(producto)=>{
    return `
        <tr>
            <td>${producto.imagen}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td> <button class="btn_quit" id="${producto.id}">❌</button></td>
        </tr>`;
};

const cargarTable = (carritoFrutas) =>{
    table.innerHTML="";
    if(carritoFrutas.length>0){
        carritoFrutas.forEach(fruta => {
            const shopping = retornarTablaHTML(fruta);
            table.innerHTML += shopping;
        });
        activarBotonesEliminar();
    }else {
        table.innerHTML = `<tr><td colspan='4'style="text-align:center;font-weight: bold;">Carrito vacío</td></tr>`;
      };
};

const activarBotonesEliminar = () =>{
    const botonesEliminar = document.querySelectorAll(".btn_quit");
    if(botonesEliminar !== null){
        for(let boton of botonesEliminar){
            boton.addEventListener('click', (event)=>{
                const frutaAEliminar = parseInt(event.target.id);
                eliminarDelCarrito(frutaAEliminar);
                cargarTable(carritoFrutas);
            });
        }
    }
};

const eliminarDelCarrito =(frutaId)=>{
    const indice = carritoFrutas.findIndex((fruta) => fruta.id == frutaId);
  if (indice !== -1) {
    carritoFrutas.splice(indice, 1);
    almacenarCarrito(carritoFrutas);
  }
};
const nombre = [];
const nombresProductos =()=>{
    carritoFrutas.forEach(fruta=>{
        nombre.push(fruta.nombre)
    });
    return nombre
};
let total = 0;
const preciosProductos =()=>{
    carritoFrutas.forEach((fruta)=>{
        total += fruta.precio;
    });
    return total;
}
const vaciarCarrito=()=>{
    localStorage.removeItem('carritoFrutas');
    table.innerHTML = `<tr><td colspan='4'style="text-align:center;font-weight: bold;">Carrito vacío</td></tr>`;
}
const botonComprar = () =>{
    const botnComprar = document.querySelector("#btnComprar");
    botnComprar.addEventListener('click', (event)=>{
        swal({
            title: "¿Confirmar la compra?",
            text: "Usted está por comprar: " + nombresProductos()+" por un total de: $"+preciosProductos(),
            icon: "warning",
            buttons: true,
            dangerMode: true,
            closeOnClickOutside: false,
            closeOnEsc: false,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Muchas Gracias por su compra!", {
                icon: "success",
                closeOnClickOutside: false,
                closeOnEsc: false,
              })
              .then(() => {
                vaciarCarrito();
              });
            } else {
              swal("Te llevaremos a tu carrito");
            }
          });
    });
}

cargarTable(carritoFrutas);
botonComprar();