import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css'; 
import '../../node_modules/react-image-gallery/styles/css/image-gallery-no-icon.css';
import '../App.css';

class Gallery extends Component {

  render() {
 
    const images = [
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]
 
    return (
        <div>
          <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false}/>
        </div>
    );
  }
 
}

export default Gallery;