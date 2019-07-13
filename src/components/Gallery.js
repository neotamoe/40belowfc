import React, {Component} from 'react';
import ImageGallery from 'react-image-gallery';
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css'; 
import '../../node_modules/react-image-gallery/styles/css/image-gallery-no-icon.css';
import '../App.css';

class Gallery extends Component {

  render() {
 
    const images = [
      {
        original: '/assets/images/80th_game.jpg',
        thumbnail: '/assets/images/80th_gamethumbnail.png',
      },
      {
        original: '/assets/images/81st_game.jpg',
        thumbnail: '/assets/images/81st_gamethumbnail.png'
      },
      {
        original: '/assets/images/2014_champions.jpg',
        thumbnail: '/assets/images/2014_championsthumbnail.png'
      },
      {
        original: '/assets/images/champions.jpg',
        thumbnail: '/assets/images/championsthumbnail.png'
      },
      {
        original: '/assets/images/fall2009.jpg',
        thumbnail: '/assets/images/fall2009thumbnail.png'
      },
      {
        original: '/assets/images/summer2008.jpg',
        thumbnail: '/assets/images/summer2008thumbnail.png'
      },
      {
        original: '/assets/images/summer2009.jpg',
        thumbnail: '/assets/images/summer2009thumbnail.png'
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