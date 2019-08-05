import React from 'react'
import LazyLoad from 'react-lazyload';

export default (props) => {
  console.log('reports')
  return (
    <LazyLoad height={200}>
      <div className="photo-item">
        <div><img src={props.url} width="150" height="150" alt={props.title}/> </div>
        <div className="photo-text-item">{props.title}</div>
        <div>id: {props.id}</div>
      </div>
    </LazyLoad>
  )
}