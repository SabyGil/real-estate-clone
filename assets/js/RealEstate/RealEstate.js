import React, { Component} from 'react'
import ReactDOM from 'react-dom'
import Header from './Header';
import Filter from './Filter';
import Listings from './Listings';
import listingsData from './data/listingsData.js';


class App extends Component {
  constructor () {
    super();
    this.state = {
      name: 'Joe',
      listingsData,
      city: 'All',
      homeType: 'All',
      bedrooms: '0',
      min_price: 0,
      max_price: 10000000,
      min_floor_space: 0,
      max_floor_space: 50000,
      elevator: false,
      finished_basement: false,
      gym: false,
      swimming_pool: false,
      filteredData: listingsData,
      populateFormsData: '',
      sorby: 'price-dsc',
      view: 'long'
    }
    this.change = this.change.bind(this);
    this.filteredData = this.filteredData.bind(this);
    this.populateForms = this.populateForms.bind(this);
  }
  componentWillMount(){
    let listingsData = this.state.listingsData.sort((a, b) => {
      return a.price - b.price
    })
    this.setState({
      listingsData
    })
  }
  change(event){
    let name = event.target.name;
    let value = (event.target.type === 'checkbox') ? event.target.value : event.target.value
    this.setState({
      [name]: value
    },() => {
      console.log(this.state)
      this.filteredData()
    })
    // console.log(event.target.value)
  }

  filteredData(){
    var newData = this.state.listingsData.filter((item) => {
      return item.price >= this.state.min_price && item.price <=
      this.state.max_price && item.floorSpace >= this.state.min_floor_space &&
      item.floorSpace <= this.state.max_floor_space && item.rooms >= this.state.bedrooms
    })
    if(this.state.city != 'All'){
      newData = newData.filter((item) =>{
        return item.city == this.state.city
      })
    }

    if(this.state.homeType != 'All'){
      newData = newData.filter((item) =>{
        return item.homeType == this.state.homeType
      })
    }

    if(this.state.sortby == 'price-dsc'){
      newData = newData.sort((a, b) => {
        return a.price - b.price
      })
    }

    if(this.state.sortby == 'price-asc'){
      newData = newData.sort((a, b) => {
        return b.price - a.price
      })
    }

    this.setState({
      filteredData: newData
    })
  }

  populateForms(){
    //City
    let cities = this.state.listingsData.map((item) => {
      return item.city
    })
    cities = new Set(cities) //only unique
    cities = [...cities]

    cities = cities.sort()

    //homeType
    let homeTypes = this.state.listingsData.map((item) => {
      return item.homeType
    })
    homeTypes = new Set(homeTypes)
    homeTypes = [...homeTypes]

    homeTypes = homeTypes.sort()


    //Bedrooms
    let bedrooms = this.state.listingsData.map((item) => {
      return item.city
    })
    bedrooms = new Set(bedrooms)
    bedrooms = [...bedrooms]

    this.setState({
      populateFormsData: {
        homeTypes,
        bedrooms,
        cities
      }
    }, () => {
      console.log(this.state)
    })
  }
  render () {
    return (
      <div>
        <Header />
        <section id="content-area">
          <Filter change={this.change} globalState={this.state} populateAction = { this.populateForms   }/>
          <Listings listingsData={this.state.filteredData} change={this.change} globalState={this.state}/>
        </section>
      </div>
    );
  }
}

const app = document.getElementById('app')

ReactDOM.render(
  <App />, app)
