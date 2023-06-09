import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
export default class News extends Component {
  articles = [
    
  ]
  constructor() {

    super();
    this.state = {
              articles : [],
              loading :false,
              page :1
    }
  }
 async componentDidMount(){

  let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=d54d5768df024b09b9e114a48f124fdc&page=1&pageSize=${this.props.pageSize}`
  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState( {
   
    articles : parsedData.articles ,
 totalResults: parsedData.totalResults ,
 loading:false
   })
  }
   handleprevClick =async ()=>{
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=d54d5768df024b09b9e114a48f124fdc&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData = await data.json();
  
  
    this.setState( {
      page:this.state.page-1,
      articles : parsedData.articles,
loading:false
    })
  }
  handlenextClick = async () =>{
   if  ( !this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {
      
  
    

      let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=d54d5768df024b09b9e114a48f124fdc&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      
      
      this.setState( {
        page:this.state.page+1,
        articles : parsedData.articles,
        loading:false
        
      })
    }
    
  }
    

    render() {
    return (
      <div className="container" >
        <h1 style={{textAlign:'center'}}><i> News and information</i></h1>
        {this.state.loading &&<Spinner/>}
      <div className='row'>
      {this.state.articles.map((element)  => {

       return <div className="col-m1-4" key ={element.url}  >

        <NewsItem  title ={element.title?element.title:''} description ={element.description?element.description:''}  imageUrl={element.urlToImage?element.urlToImage:''} newsUrl ={element.url?element.url:''} />
        
        </div>
      })}
    
      </div>

      <div className="container">
        <button disabled ={this.state.page<=1} onClick={this.handleprevClick} style = {{float:'left',color:'white', backgroundColor:'black'}} >&larr; previous </button>
        <button disabled= {this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handlenextClick} style = {{float:'right', backgroundColor:'black' ,color:'white'}}> next &rarr; </button>
      </div>
      </div>
    )
  }

}