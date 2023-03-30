<div className="flex justify-between items-center w-[70%] px-4">
  <div className="flex items-center text-indigo-500 text-xl gap-x-2">
    <ion-icon name="cash-outline"></ion-icon>
    <p className="font-normal py-3 text-xl lg:text-2xl text-slate-900 uppercase tracking-widest">
      millionare mind
    </p>
  </div>
  <ul className="hidden md:flex gap-x-7 uppercase font-semibold text-xs">
    <Link to={"/admin"}>
      <li className="py-4  ">Home Admin</li>
    </Link>
    <Link to={"/admin/nuevoproducto"}>
      <li className="py-4">Nuevo Producto</li>
    </Link>
  </ul>
  <div className="hidden md:flex items-center gap-x-5">
    <Link
      to={"/micuenta"}
      className="text-xs font-semibold hidden md:block uppercase"
    >
      Mi cuenta
    </Link>
  </div>
</div>;

<div className="flex justify-between items-center w-[70%] px-4">
  <div className="flex items-center text-indigo-500 text-xl gap-x-2">
    <ion-icon name="cash-outline"></ion-icon>
    <p className="font-normal py-3 text-xl lg:text-2xl text-slate-900 uppercase tracking-widest">
      millionare mind
    </p>
  </div>
  <ul className="hidden md:flex gap-x-7 uppercase font-semibold text-xs">
  <Link to={'/'}>
                      <li className='py-4 '>Home</li>
                    </Link>
                    <Link to={'/productos'}>
                      <li className='py-4 '>Productos</li>
                    </Link>
                    <Link to={'/nosotros'}>
                      <li className='py-4 '>Nosotros</li>
                    </Link>
  </ul>
  <div className='hidden md:flex items-center gap-x-5'>
          <Link className='text-2xl' to={'/carrito'}>
            <Badge badgeContent={sumaCantidadBadge()} color="secondary" >
               <ion-icon name="cart-outline"></ion-icon>
            </Badge>
          </Link>
          <Link to={'/micuenta'} className='text-xs font-semibold hidden md:block uppercase'
          >Mi cuenta</Link> 
        </div>
</div>;

