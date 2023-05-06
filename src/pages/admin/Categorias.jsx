import { useState, useEffect } from "react";
import { updateDoc, getDoc, doc, onSnapshot, collection, deleteDoc, } from "firebase/firestore";
import { db } from "../../utils/firebaseconfig";
import NuevaCategoria from "../../components/admin/NuevaCategoria";
import EditarCategoria from "../../components/admin/EditarCategoria";
import EditarSubcategoria from "../../components/admin/EditarSubcategoria";
import NuevaSubcategoria from "../../components/admin/NuevaSubcategoria";
import BorrarProducto from "../../components/BorrarProducto";
import Swal from "sweetalert2";
import Categoria from "../../components/admin/Categoria";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  //  Estados para manejar las busquedas de los categorias
  const [busqueda, setBusqueda] = useState("");
  const [categoriasBuscadas, setCategoriasBuscadas] = useState([]);

  // Estado para las categorias
  const [modal, setModal] = useState(false);

  const [categoriaAcciones, setCategoriaAcciones] = useState({
    nueva: false,
    editar: {},
    nuevaSubcategoria: "",
    editarSubcategoria: {},
  });

  // estado para editar la subcategoria
  const [subCategoriaAEditar, setSubCategoriaAEditar] = useState({});

  // Eliminar categorias y subcategorias
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [subCategoriaAEliminar, setSubCategoriaAEliminar] = useState(null);

  // Read Products
  useEffect(() => {
    const docRef = collection(db, "categorias");
    // Escuchar cambios en tiempo real en el documento
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const categorias = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCategorias(categorias);
    });
    return () => unsubscribe();
  }, []);

  // Delete
  const eliminarCategoria = (id) => {
    const documento_A_Eliminar = doc(db, "categorias", id);
    deleteDoc(documento_A_Eliminar);

    Swal.fire({
      icon: "success",
      title: "Categoria eliminada",
    })
  };
  const buscarCategorias = (e) => {
    e.preventDefault();
    const buscar = categorias.filter((cat) =>
      cat.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setCategoriasBuscadas(buscar);
  };
  const handleModal = () => {
    setModal(!modal);
  };
  const eliminarSubcategoria = async (categoriaId, subcategoriaId) => {
    const docref = doc(db, "categorias", categoriaId);
    const categoria = await getDoc(docref);
    const subCategoriasActualizadas = categoria
      ?.data()
      ?.subcategorias?.filter(
        (subcategoria) => subcategoria.id !== subcategoriaId
      );
    await updateDoc(docref, { subcategorias: subCategoriasActualizadas });
    Swal.fire({
      icon: "success",
      title: "Subcategoria eliminada",
    })
  };
  const mostrarModal = () => {
    switch (true) {
      case categoriaAcciones.nueva:
        return (
          <NuevaCategoria
            handleModal={() =>
              setCategoriaAcciones({ nueva: false, nuevaSubcategoria: "" })
            }
          />
        );

      case categoriaAcciones.editar && Object.keys(categoriaAcciones.editar).length !== 0:
        return (
          <EditarCategoria
            categoriaAEditar={categoriaAcciones.editar}
            setCategoriaAEditar={setCategoriaAcciones}
            setSubCategoriaAEditar={setSubCategoriaAEditar}
          />
        );

      case categoriaAcciones.nuevaSubcategoria !== "" &&
        categoriaAcciones.nuevaSubcategoria !== null:
        return (
          <NuevaSubcategoria
            setCategoriaAcciones={setCategoriaAcciones}
            categoriaId={categoriaAcciones.nuevaSubcategoria}
          />
        );

      case Object.keys(subCategoriaAEditar).length !== 0:
        return (
          <EditarSubcategoria
            categoriaAcciones={categoriaAcciones.editarSubcategoria}
            setCategoriaAcciones={setCategoriaAcciones}
            subCategoriaAEditar={subCategoriaAEditar}
            setSubCategoriaAEditar={setSubCategoriaAEditar}
            handleModal={handleModal}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="w-[75%] ml-[25%] ">
      {mostrarModal()}
      <section className="grid grid-rows-2">
        <article className="flex items-center justify-between  my-8 mx-4">
          <form
            className="relative w-1/4 flex flex-col"
            onSubmit={buscarCategorias}
          >
            <input
              type="search"
              className="
                            bg-transparent font-normal text-xs p-2 border-[1px] border-secundario 
                    rounded-lg text-blanco focus:outline-none
                          "
              placeholder="Buscar categorias por nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <div className="absolute text-blanco right-2 top-2">
              <button type="submit">
                <ion-icon name="search"></ion-icon>
              </button>
            </div>
          </form>
          <div className=" flex  items-center gap-x-1 text-secundario text-xl font-medium ">
            <ion-icon name="add-sharp"></ion-icon>
            <button onClick={() => setCategoriaAcciones({ nueva: true })}>
              Nueva Categoria
            </button>
          </div>
        </article>
        <article className="w-[90%] pl-4  mb-5 mx-auto grid grid-cols-5 gap-x-10 place-items-start self-center">
          <p className="text-lg font-medium text-blanco">Id</p>
          <p className="text-lg font-medium text-blanco">Descripcion</p>
          <p className="text-lg font-medium text-blanco">Registro</p>
          <p className="text-lg font-medium text-blanco pl-4">Acciones</p>
          <p className="text-lg font-medium text-blanco pl-8">Mas</p>
        </article>
      </section>
      <section className="flex flex-col  h-3/4  ">
        {categorias.map(categoria => 
          <Categoria
            key={categoria.id}
            categoria={categoria}
            setCategoriaAEliminar={setCategoriaAEliminar}
            categoriaAcciones={categoriaAcciones}
            setCategoriaAcciones={setCategoriaAcciones}
            setSubCategoriaAEditar={setSubCategoriaAEditar}
            setSubCategoriaAEliminar={setSubCategoriaAEliminar}
          />
        )}

        {/**  Alertas para eliminar las categorias & subcategorias */}
        {categoriaAEliminar !== null && (
          <BorrarProducto
            eliminarProducto={() => eliminarCategoria(categoriaAEliminar?.idCategoria)}
            setModal={() => setCategoriaAEliminar(null)}
            titulo={"Eliminar Categoria"}
            sustantivo={"la categoria"}
            nombre={categoriaAEliminar?.nombre}
          />
        )}

        {subCategoriaAEliminar !== null && (
          <BorrarProducto
            eliminarProducto={() => eliminarSubcategoria(subCategoriaAEliminar?.idCategoria, subCategoriaAEliminar?.idSubcategoria)}
            setModal={() => setSubCategoriaAEliminar(null)}
            titulo={"Eliminar Subcategoria"}
            sustantivo={"la subcategoria"}
            nombre={subCategoriaAEliminar?.nombre}
          />
        )}
      </section>
    </main>
  );
}
