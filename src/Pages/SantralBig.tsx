import React, {useEffect, useState} from 'react';
import santrals, {santral, santral_meta} from '../Data/santral';
import {useParams, Link} from 'react-router-dom';

// Component
import Graph from '../Components/graph';

function SantralBig(props:any) {
  const {name} = useParams();
  const [self, setSelf] = useState<santral| null>(null);
  const [weather, setWeather] = useState<any>();
  const [powbar, setPowbar] = useState("0%");
  const [cloudbar, setCloudbar] = useState("0%");


  useEffect(()=> {
    var st = santrals.filter(st => {
      return st.name === name;
    })
    setSelf(st? st[0] : null);
  }, [])

  useEffect(()=> {
    if (self){
      setTimeout(()=> {
        var powbarRatio : number = Math.trunc((self.power * 100) / santral_meta.maxPower);
        setPowbar((powbarRatio.toString() + "%")) 
      }, 300)


        
      var key: string = "0361f5f7668ba97ecfd89883134b592b";
      var apiend: string = "https://api.openweathermap.org/data/2.5/weather?lat=" + self.position.x.slice(0, 4) + "&lon=" + self.position.y.slice(0, 4) + "&appid=" + key + "&units=metric" ;
      fetch(apiend)
      .then(
        res => {
          return res.json();
        }
      ).then(
        res => {
          setWeather(res)
        }
      )
    }
  }, [self])

  useEffect(()=> {
    if (weather){
      setTimeout(()=> {
        setCloudbar((weather.clouds.all.toString() + "%")) 
      }, 300)
    }
  }, [weather])

  if (self && weather) {
    return (
      <section>
        <div className='w-screen h-[86vh] relative py-12 px-12 flex items-center justify-evenly'>
          <div className='w-1/3 h-full p-4 bg-white drop-shadow rounded-lg'>
            <h1 className='text-2xl text-center mb-6'>{self.name}</h1>
            <div className='my-6'>
              <h2 className='text-xl mb-2'>Güç:</h2>
              <div className='px-4'>
                <p>{self.power} {self.unit}</p>
                <div className=' relative w-full h-2 mt-1'>
                  <hr className={'bg-cyan-400 outline-none border-none shadow-none h-2 rounded absolute top-0 left-0 z-10'} style={{width: powbar, transition: "all 0.8s ease"}}/>
                  <hr className={'bg-gray-900 outline-none border-none shadow-none h-2 rounded absolute top-0 left-0 w-full'}/>
                </div>
              </div>
            </div>
            <div className='my-6'>
              <h2 className='text-xl mb-2'>Lokasyon:</h2>
              <div className='px-4'>
                <p>{self.position.city}</p>
              </div>
            </div>
            <div className='my-6'>
              <h2 className='text-xl mb-2'>Hava Durumu:</h2>
              <div className='px-4'>
                <div className='my-2'>
                  <span className='text-xl mb-2 mr-2'>Sıcaklık:</span>
                  <span>{weather.main.temp} C</span>
                </div>
              </div>
              <div className='px-4'>
                <div className='my-2'>
                  <span className='text-xl mb-2 mr-2'>Görünürlük:</span>
                  <span>{weather.visibility >= 10000 ? "10000(max)" : weather.visibility} m</span>
                </div>
              </div>
              <div className='px-4'>
                <span className='text-xl mb-2 mr-2'>Bulut:</span>
                <span>%{weather.clouds.all}</span>
                <div className=' relative w-full h-2 mt-1'>
                  <hr className={'bg-gray-500 outline-none border-none shadow-none h-2 rounded absolute top-0 left-0 z-10'} style={{width: cloudbar, transition: "all 0.8s ease"}}/>
                  <hr className={'bg-blue-300 outline-none border-none shadow-none h-2 rounded absolute top-0 left-0 w-full'}/>
                </div>
              </div>
            </div>
          </div>
          <div className='w-2/3 p-4'>
            <Graph self={self} cloud={weather.clouds.all}></Graph>
          </div>
        </div>
      </section>
    );
  }
  else {
    return (
      <section>
        <div className='w-screen h-[86vh] py-24 flex items-center justify-evenly flex-col'>
          <span className='text-center font-semibold text-6xl'>404</span>
          <span className='text-center text-2xl'>Aradığınız santral bulunamadı veya bir hata oluştu. Lütfen biraz bekleyin veya <Link to="/"><strong className='text-orange-400'>tekrar deneyin</strong></Link></span>
        </div>
      </section>
    )
  }
}

export default SantralBig;
