import React from 'react';
import './Face.css';

const FaceRecognition = ({imgurl, box}) => {
    return (
        <div className="center">
           <div className='picture absolute mt2'>
              <img id='imageid' className="image" src={imgurl} alt="" />
              { box.map((item, index) => (
                    <div className='bounding-box' style={{top: item.topRow, right: item.rightCol, bottom: item.bottomRow, left: item.leftCol}} key={index}></div>
                ))}
           </div>
        </div>
    )
}

export default FaceRecognition;