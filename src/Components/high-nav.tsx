import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import santrals from '../Data/santral';


function HighNav() {
  const [active, setActive] = useState(false);

  useEffect(()=> {
    if (active) {
      document.body.addEventListener("click", closeChange)
    } 

    return () => {
      document.body.removeEventListener("click", closeChange);
    }
  }, [active])

  function activeChange(e?: any) {
    setActive(!active);
    e?.stopPropagation();
  }

  function closeChange(e: any) {
    if (e.target.closest("#high-nav") === null){
      activeChange();
      document.body.removeEventListener("click", closeChange);
    }
  }

  function getSantrals() {
    var out: React.ReactElement[] = [];
    for (let i = 0 ; i < santrals.length ; i++) {
      out.push(
        <li className=' p-2 pl-4 my-2 rounded-sm'><span className='text-m'>{santrals[i].name}</span></li>
      )
      if ((i+1) < santrals.length) {
        out.push( 
          <hr className="bg-gray-300 ml-3 outline-none border-none shadow-none h-[2px]"/>
        )

      }
    }
    return out;
  }

  // menu
  if (active) {
    return (
      <div>
        <div className='px-4 rounded-full w-16 h-16 bg-slate-200 cursor-pointer relative'>
          <hr className='bg-gray-400 outline-none border-none shadow-none h-1 w-8 rounded absolute top-1/2 left-1/2 rotate-45 -translate-x-1/2 -translate-y-1/4'/>
          <hr className='bg-gray-400 outline-none border-none shadow-none h-1 w-8 rounded absolute top-1/2 left-1/2 -rotate-45 -translate-x-1/2 -translate-y-1/4'/>
        </div>
        <ul id="high-nav" className='absolute top-[14vh] right-0 min-w-40 w-2/6 min-h-screen bg-slate-100 px-4 py-8 pr-8 list-none'>
          <hr className="bg-gray-300 ml-3 outline-none border-none shadow-none h-[2px]"/>
          <li className=' p-2 pl-4 my-2 rounded-sm'>
            <Link to="/"><span className='text-xl'>Santraller</span></Link>
            <ul className='w-full list-none'>
              {getSantrals()}
            </ul>
          </li>
          <hr className="bg-gray-300 ml-3 outline-none border-none shadow-none h-[2px]"/>
          <li className='p-2 pl-4 my-2 rounded-sm'>
            <a href="https://github.com/akifsahinkorkmaz/charts"><span className='text-xl'>Github Projesi</span></a>
          </li>
          <hr className="bg-gray-300 ml-3 outline-none border-none shadow-none h-[2px]"/>
          <li className='p-2 pl-4 my-2 rounded-sm'>
            <a href="https://github.com/akifsahinkorkmaz/charts#readme"><span className='text-xl'>ReadME</span></a>
          </li>
          <hr className="bg-gray-300 ml-3 outline-none border-none shadow-none h-[2px]"/>
        </ul>
      </div>
    );
  }
  // ham
  else {
    return (
      <div className='pt-4 px-4 rounded-full w-16 h-16 bg-slate-200 cursor-pointer' onClick={activeChange} >
        <hr className='bg-gray-400 outline-none border-none shadow-none h-1 w-8 rounded mb-2'/>
        <hr className='bg-gray-400 outline-none border-none shadow-none h-1 w-8 rounded mb-2'/>
        <hr className='bg-gray-400 outline-none border-none shadow-none h-1 w-8 rounded mb-2'/>
      </div>
    );
  }

}

export default HighNav;
