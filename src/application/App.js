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

    if(moveTo !== {} ) infospot.addEventListener('click', function(){viewer.setPanorama(moveTo)}); 

    return infospot;
}////

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

const changeMode = () =>{
  
    modeIndex = modeIndex >= 2 ? 0 : modeIndex + 1;
    
    switch ( modeIndex ) {
        
      case 0: viewer.disableEffect(); break;
      case 1: viewer.enableEffect( PANOLENS.MODES.CARDBOARD ); break;
      case 2: viewer.enableEffect( PANOLENS.MODES.STEREO ); break;
      default: break;
        
    }
}



const viewer = new PANOLENS.Viewer();//

let modeIndex = 0;
let Pano1 = new PANOLENS.ImagePanorama('./assets/img/pano1.png');//
let Pano2 = new PANOLENS.ImagePanorama('./assets/img/pano2.png');//
let Pano3 = new PANOLENS.VideoPanorama('./assets/video/bb.mp4', { autoplay: true, muted: false });//


let pano1_inf1 = createPoint(3425.53, -1998.13, -3038.09, "", "/valley" )//
let pano1_inf3 = createPoint(-3018.83, -1558.51, -3659.56,  "");//
let pano1_inf4 = createPoint(3349.55, -445.70, 3681.14,  "");//
let pano1_move1 = createPoint(4893.62, -951.60, 212.12, "", "", "./assets/img/move.png", Pano2);//

let pano2_inf1 = createPoint(4872.66, -1076.20, 139.31, "", "", "./assets/img/video.png", "");//

let pano2_inf2 = createPoint(1473.89, -1444.85, -4550.58, "", "/safari");//
let pano2_inf3 = createPoint(-1256.02, -1609.31, 4555.24);//
let pano2_move1  = createPoint(-4912.44, -646.55, -612.05, "", "", "./assets/img/exit.png", Pano1);//

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

Pano1.add(pano1_inf1, pano1_inf3, pano1_inf4, pano1_move1);
Pano2.add(pano2_inf1, pano2_inf2, pano2_inf3, pano2_move1);

viewer.container.style.width = 1200 + "px";//
viewer.container.style.height = 600 + "px";//
viewer.onWindowResize( 1200, 600 );/////

viewer.add(Pano1, Pano2, Pano3);//

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
}//

const Information = () =>{
    return(
        <>
            <p className='art-name'>New Art Exhibition</p>
            <p className='about'>New Art Exhibiton is a project that will help you interactively present your art exhibition.
                                 Use the buttons below or the mouse to move around the exhibition.</p>
        </>
    )
}//
const App = () => {

    const [done, setDone] = useState(false);
    useEffect(()=>{
      setTimeout(()=>{
        fetch("./assets/img/pano1.png")
        .then(response => response.blob())
        .then(() =>{
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
