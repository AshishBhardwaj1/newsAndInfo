import React, { Component } from 'react'
import NewsItem from './NewsItem'
export default class News extends Component {
  articles = [
   
  ]
  constructor() {

    super();
    this.state = {
              articles : this.articles,
              loading :false,
              page :1
    }
  }
 async componentDidMount(){
let url ='https://newsapi.org/v2/top-headlines?country=in&apiKey=d54d5768df024b09b9e114a48f124fdc'
let data = await fetch(url);
let parsedData = await data.json();
this.setState({articles : parsedData.articles})



  }
  render() {
    return (
      <div className="container">
      <div className='row'>
      {this.state.articles.map((element)  => {

       return <div className="col-m1-4" key ={element.url}  >

        <NewsItem  title ={element.title?element.title:''} description ={element.description?element.description:''}  imageUrl={element.urlToImage?element.urlToImage:''} newsUrl ={element.url?element.url:''} />
        
        </div>
      })}
    
      </div>

      <div className="container">
        <button > previous </button>
        <button >next</button>
      </div>
      </div>
    )
  }
}
