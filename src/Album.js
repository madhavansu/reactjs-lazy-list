import React from 'react';
import Photo from './Photo';
import LazyLoad from 'react-lazyload';
// import Carousel from 'react-bootstrap/Carousel'
// const Photo = lazy(() => import ('./Photo'));

const url = "https://jsonplaceholder.typicode.com/photos?albumId=";

export default class Album extends React.Component {

  stringifyResponse = response => {
    if (response.status >= 400) throw new Error(response)
    return response.headers.get("Content-Type").includes("application/json") ? response.json() : response.text()
  }

  get = (url, data) => (
    fetch(url, {
      body: data
    })
    .then(response => this.stringifyResponse(response))
  )

  constructor(props) {
    super(props)
     
    this.get(url+this.props.id, null).then((results) => {
    let photos = results.map((photos) => {
      return <Photo key={photos.title} {...photos}/>
    })

    this.setState( {photos})
    })     
    this.state = { 'photos': "Please Wait"}
  }

  render() {
    return (
      <LazyLoad height={200}>
        <div className="album">
            <div className="album-container">
                <h3>{this.props.title}</h3>
                <div><label>id: {this.props.id}</label>, <label>userid: {this.props.userId}</label></div>
            </div>
            <div className="photo-container">{this.state.photos}</div>
        </div>
      </LazyLoad>

      
    )
  }
}
