import { almacenarCarrito, carritoFrutas } from "./carrito.js";

const table = document.querySelector('.table');

const retornarTablaHTML = (producto) => {
    return `
        <tr>
            <td>${producto.imagen}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td> <button class="btn_quit" id="${producto.id}">❌</button></td>
        </tr>`;
};

const cargarTable = (carritoFrutas) => {
    table.innerHTML = "";
    if (carritoFrutas.length > 0) {
        carritoFrutas.forEach(fruta => {
            const shopping = retornarTablaHTML(fruta);
            table.innerHTML += shopping;
        });
        activarBotonesEliminar();
    } else {
        table.innerHTML = `<tr><td colspan='4'style="text-align:center;font-weight: bold;">Carrito vacío</td></tr>`;
    }
};

const activarBotonesEliminar = () => {
    const botonesEliminar = document.querySelectorAll(".btn_quit");
    if (botonesEliminar !== null) {
        for (let boton of botonesEliminar) {
            boton.addEventListener('click', (event) => {
                const frutaAEliminar = parseInt(event.target.id);
                eliminarDelCarrito(frutaAEliminar);
                cargarTable(carritoFrutas);
            });
        }
    }
};

const eliminarDelCarrito = (frutaId) => {
    const indice = carritoFrutas.findIndex((fruta) => fruta.id == frutaId);
    if (indice !== -1) {
        carritoFrutas.splice(indice, 1);
        almacenarCarrito(carritoFrutas);
    }
};

const nombresProductos = () => {
    return carritoFrutas.map(fruta => fruta.nombre).join(', ');
};

let total = 0;
const preciosProductos = () => {
    total = 0; // Reinicializar el total a cero antes de calcularlo nuevamente
    carritoFrutas.forEach(fruta => {
        total += fruta.precio;
    });
    return total;
};

const vaciarCarrito = () => {
    localStorage.removeItem('carritoFrutas');
    carritoFrutas.length = 0; // Reinicializar el carritoFrutas como un arreglo vacío
    total = 0; // Reinicializar el total a cero antes de vaciar el carrito
    cargarTable(carritoFrutas); // Actualizar la tabla con el carrito vacío
    table.innerHTML = `<tr><td colspan='4'style="text-align:center;font-weight: bold;">Carrito vacío</td></tr>`;
  };
  const botonComprar = () => {
    const botnComprar = document.querySelector("#btnComprar");
    botnComprar.addEventListener('click', (event) => {
      event.preventDefault();
  
      if (carritoFrutas.length === 0) {
        swal("Carrito vacío", "Agregue productos al carrito antes de comprar.", "info", {
          icon:"warning",
          closeOnClickOutside: false,
          closeOnEsc: false,
          dangerMode: true,
        });
      } else {
        swal({
          title: "¿Confirmar la compra?",
          text: "Usted está por comprar: " + nombresProductos() + " por un total de: $" + preciosProductos(),
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
              vaciarCarrito(); // Vaciar el carrito solo una vez después de la compra
            });
          } else {
            swal("Te llevaremos a tu carrito");
          }
        });
      }
    });
  }  

cargarTable(carritoFrutas);
botonComprar();
