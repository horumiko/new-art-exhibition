import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ReactLoading from "react-loading";
import './ImageZoom.css'
import { Link } from "react-router-dom";
const IMAGES = [
  "https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg",
  "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg"
];

const IMAGESOBJECT = [];

const ImageZoom = (props) => {
  const [done, setDone] = useState(false);

  useEffect(()=>{
    document.body.removeChild(document.querySelector('.panolens-container')); 
    setTimeout(()=>{
      fetch(IMAGES[parseInt(props.item)])
      .then(response => response.blob())
      .then((imageBlob) =>{
        const imageObjectURL = URL.createObjectURL(imageBlob);
        IMAGESOBJECT.push(imageObjectURL);
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
  ) : (<>
    <div className="container">
      <div className="information">
            <h1>{props.name}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at fringilla nunc, vel fermentum lectus. Donec ut efficitur magna. Sed viverra interdum eros, vel tempus mauris convallis tempor. Cras finibus sagittis leo eu lacinia. Integer auctor eu velit vehicula sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam mi dui, faucibus eu eleifend non, scelerisque quis est. Pellentesque nisi elit, porta tincidunt est ut, cursus rhoncus lorem. Nam posuere est non eros consequat fringilla. Nulla elementum congue cursus.</p>
            <Link to="/">Home</Link> |{" "}
      </div>
      <div className="zoom">
        <TransformWrapper
            defaultScale={15}
            defaultPositionX={100}
            defaultPositionY={100}
        >
          <TransformComponent>
              <img src={IMAGESOBJECT[0]} style={{ width: "100%" }} />
          </TransformComponent>
        </TransformWrapper>
      </div>

    </div>
    </>
  ))
};

export default ImageZoom;
