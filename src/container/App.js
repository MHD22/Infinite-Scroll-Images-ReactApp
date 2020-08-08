import React from 'react';
import './App.css';
import 'tachyons';
import Images from '../components/Images';
import Loading from '../components/Loading';

const apiKey ='gZltUiUKrujp2xyoVwrqyrnolWRivEF1UvOnHqg4Dz8';
let count =5;
let initial = true; // for first load of images to be just 5 
let url=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
class App extends React.Component {

  constructor(){
    super();
    this.state={
      loading:true,
      photosArray:[],
      ready:true,
    }
  }

  getPhotos =async function(){
    try{
      const response= await fetch(url);
      let data= await response.json();
      let imagesArray=  await data.map( (x,y) => { //create <a> <img> </a> elements 
        return(
        <a 
            key={y+this.state.photosArray.length} 
            href={x.links.html} 
            target={'_blank'} >
                <img 
                     src={x.urls.regular} 
                    alt={x.alt_description} 
                    title={x.alt_description}  />
         </a>)
    });
    //edit the count after the first load to be 20 images and update the url ..
    if(initial){
      initial = false  ;
      count = 20;
      url = url=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
      //concatinate the new fetched images to the previous imageArray
      this.setState({photosArray : this.state.photosArray.concat(imagesArray) , ready:true , loading:false});
      
      
    }
      catch(error){
      console.log("error..something wrong with fetching!..");
    }
  }

  componentDidMount(){
    this.getPhotos();
    // add scroll event to widow object .. and set it to request when reach the bottom of the page..
    window.addEventListener('scroll',()=>{
      // innerHeight = the whole height of the browser page // scrollY = where are we from the top of the page .. // body.offsetHeight = the whole height of the body including the part which is not appear // ready = to prevent sending multiple request at a time 
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && this.state.ready)
      {
        this.setState({ready:false}, this.getPhotos);
      }
    
    });
  }
  render(){
  return (

    <div className="App">
      <h1 className=" ">{'Infinite Scroll Images'}</h1>
      { this.state.loading?
      <Loading/> :
      <Images array={this.state.photosArray}/>
      }
    </div>
  );
}
}
export default App;
