import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {santral, santral_meta} from '../Data/santral';

interface Iprops {
  self: santral,
  siblings: number
}

function SantralSmall(props: Iprops ) {

  const [powbar, setPowbar] = useState("");

  useEffect(()=> {
    var powbarRatio : number = Math.trunc((props.self.power * 100) / santral_meta.maxPower);
    setPowbar((powbarRatio.toString() + "%")) 
  }, [])

  return (
        
    <Link to={props.self.name}>
      <div className='bg-orange-400 lg:w-64 lg:rounded drop-shadow p-4 text-white'>
        <h1 className='text-center text-xl mb-4 h-16'>{props.self.name}</h1>
        <div className='my-2'>
          <p>{props.self.power} {props.self.unit}</p>
          <div className=' relative w-full h-2 mt-1'>
            <hr className={'bg-cyan-400 outline-none border-none shadow-none h-2 rounded absolute top-0 left-0 z-10'} style={{width: powbar}}/>
            <hr className={'bg-gray-900 outline-none border-none shadow-none h-2 rounded absolute top-0 left-0 w-full'}/>
          </div>
        </div>
        <p className='text-center mt-8'>{props.self.position.city}</p>
      </div>
    </Link>
  );
}

export default SantralSmall;