import React from 'react';
import santrals from '../Data/santral';

// Components
import SantralSmall from '../Components/santralsmall';


function Home() {
  var sts = santrals;

  function setSantrals() {
    var out: React.ReactElement[] = [];
    sts.forEach(st => {
      out.push(
        <SantralSmall key={st.name} self={st} siblings={sts.length}></SantralSmall>
      )
    });
    return out;
  }

  return (
    <section>
        <div className='w-screen h-[86vh] py-24 flex items-center justify-evenly'>
          {setSantrals()}
        </div>
    </section>
  );
}

export default Home;
