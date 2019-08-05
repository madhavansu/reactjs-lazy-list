import React from 'react';
import Album from './Album';
// const Album = lazy(() => import ('./Album'));

const url = "https://jsonplaceholder.typicode.com/albums";

export default class Home extends React.Component {

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

  constructor() {
     super()
     this.get(url, null).then((results) => {
      let albums = results.map((album) => {
      	return <Album key={album.title} {...album}/>
      })

      this.setState( {albums})
     })
     
     this.state = { 'albums': "Please Wait"}
  }

  render() {
    return <div>
        {this.state.albums}
    </div>
  }
}