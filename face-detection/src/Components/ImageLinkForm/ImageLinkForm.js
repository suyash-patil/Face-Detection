import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onSubmit}) => {
    return (
        <div>
            <p className="f3 fnt">
                {'This magic brain will detect faces in the images'}
            </p>
            <div className="form pa4 br3 shadow-5">
                <input className="f5 pa2 w-70 fnt" type='text' placeholder='Enter the url of image' onChange={onInputChange} />
                <button className="fnt w-30 f5 link ph3 pv2 dib white bg-light-purple grow pointer" onClick={onSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm;