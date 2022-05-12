import * as PANOLENS from 'panolens';
import React, { useEffect, useState } from "react";
import * as THREE from 'three';
import ReactLoading from "react-loading";
import './App.css';

const createPoint = (x = 0, y = 0, z = 0, hoverText="", urlLink = '', urlImg = './assets/img/infospot.png', moveTo = {}) =>{
    let infospot = new PANOLENS.Infospot(500, urlImg);
  
    infospot.position.set(x, y, z);
  
    infospot.addHoverText( hoverText );
    if(urlLink.length != 0) infospot.addEventListener('click', function(){window.open(urlLink)});

    if(moveTo != {}) infospot.addEventListener('click', function(){viewer.setPanorama(moveTo)}); 
  
    return infospot;
}

let flag = false;

const playMusic = () =>{
    if(!flag){
      sound.play();
      flag = true
    }
    else {
      sound.pause();
      flag = false;

  };
}

function changeMode(){
  
    modeIndex = modeIndex >= 2 ? 0 : modeIndex + 1;
    
    switch ( modeIndex ) {
        
      case 0: viewer.disableEffect(); break;
      case 1: viewer.enableEffect( PANOLENS.MODES.CARDBOARD ); break;
      case 2: viewer.enableEffect( PANOLENS.MODES.STEREO ); break;
      default: break;
        
    }
}
const viewer = new PANOLENS.Viewer( { 
    output: 'console',
});

let modeIndex = 0;
let Pano1 = new PANOLENS.ImagePanorama('./assets/img/pano1.jpeg');
let Pano2 = new PANOLENS.ImagePanorama('./assets/img/pano2.jpeg');
let Pano3 = new PANOLENS.VideoPanorama('./assets/video/bb.mp4', { autoplay: true, muted: false });

let pano1_inf1 = createPoint(377.99, -224.88, -4971.35, "", "/valley");
let pano1_inf2 = createPoint(-3861.60, -175.26, -3154.59, "", "/safari");
let pano1_inf3 = createPoint(-4122.69, -179.26, 2806.51,  "");
let pano1_inf4 = createPoint(385.95, -229.41, 4970.76,  "");
let pano1_inf5 = createPoint(4788.60, -305.95, 1374.36,  "");
let pano1_inf6 = createPoint(4617.66, -241.92, -1877.12,  "");
let pano1_move1 = createPoint(-4369.13, -1601.59, 1811.04, "Pano2", "", "./assets/img/move.png", Pano2);


let pano2_inf1 = createPoint(-991.56, 221.51, -4889.54);
let pano2_inf2 = createPoint(-4982.36, 288.14, 120.51);
let pano2_inf3 = createPoint(-1398.34, 292.86, 4782.71);
let pano2_inf4 = createPoint(2190.09, 141.30, 4481.81);
let pano2_inf5 = createPoint(4987.53, -214.71, 76.96);
let pano2_move1  = createPoint(4218.92, -1799.96, 1973.12, "Pano1", "", "", Pano1);


const listener = new THREE.AudioListener();
const sound = new THREE.Audio( listener );
const audioLoader = new THREE.AudioLoader();


audioLoader.load( "./assets/audio/audioGuide.mp3", function( buffer ) {
  sound.setBuffer( buffer );
  sound.setLoop( true );
  sound.setVolume( 0.1 );

}, function ( xhr ) {
console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
},

function ( err ) {
console.log( 'error: music' );
});

Pano1.add(pano1_inf1, pano1_inf2, pano1_inf3, pano1_inf4, pano1_inf5, pano1_inf6, pano1_move1);
Pano2.add(pano2_inf1, pano2_inf2, pano2_inf3, pano2_inf4, pano2_inf5, pano2_move1);

viewer.container.style.width = 1200 + "px";
viewer.container.style.height = 600 + "px";
viewer.onWindowResize( 1200, 600 );

viewer.add(Pano1, Pano2, Pano3);

document.querySelector('.panolens-container').style.display = 'none';

const onButtonClick = ( targetPanorama ) => {
    viewer.setPanorama(targetPanorama);
    sound.pause();
}

const Buttons = () => {
    return(
        <>
        <div className='buttons'>
        <button className='fill' onClick={onButtonClick.bind(this, Pano1)}>Pano1</button>
            <button className='fill' onClick={onButtonClick.bind(this, Pano2)}>Pano2</button>
            <button  className='fill' onClick={onButtonClick.bind(this, Pano3)}>Video</button>
            <button  className='fill' onClick={playMusic}>Audio Guide</button>
            <button  className='fill' onClick={changeMode.bind(this)}>Change Mode</button>
        </div>

        </>
    )
}

const Information = () =>{
    return(
        <>
            <p className='art-name'>New Art Exhibition</p>
            <p className='about'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at fringilla nunc, vel fermentum lectus. Donec ut efficitur magna. Sed viverra interdum eros, vel tempus mauris convallis tempor. Cras finibus sagittis leo eu lacinia. Integer auctor eu velit vehicula sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam mi dui, faucibus eu eleifend non, scelerisque quis est. Pellentesque nisi elit, porta tincidunt est ut, cursus rhoncus lorem. Nam posuere est non eros consequat fringilla. Nulla elementum congue cursus.</p>
        </>
    )
}
const App = () => {

    const [done, setDone] = useState(false);
    useEffect(()=>{
      setTimeout(()=>{
        fetch("https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg")
        .then(response => response.blob())
        .then((imageBlob) =>{
          const imageObjectURL = URL.createObjectURL(imageBlob);
          //IMAGES.push(imageObjectURL);
          document.querySelector('.panolens-container').style.display = 'block';
          setDone(true);
        })
      }, 2000)}, []);

    return (
        !done ? (
        <ReactLoading className="loader"
          type={"cubes"}
          color={"#181818"}
          height={100}
          width={100}
        />
      ) : (
        <>
            <Information />
            <Buttons />
        </>
    ));
}

export default App;
