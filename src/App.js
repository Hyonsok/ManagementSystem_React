import React, {Component} from 'react';
import Customer from './Components/Customer';
import './App.css';

// by adding [], customers are in an array
const customers = [
{
  'id' : 1,
  'image' :  'https://placeimg.com/64/64/1', // place any random image site 64x64
  'name' : 'Hyonsok',
  'birthday' : '20190629',
  'gender' : 'Male',
  'job' : 'student'
},
{
  'id' : 2,
  'image' :  'https://placeimg.com/64/64/2', 
  'name' : 'Alex ',
  'birthday' : '20190630',
  'gender' : 'Male',
  'job' : 'student'
},
{
  'id' : 3,
  'image' :  'https://placeimg.com/64/64/3', // place any random image site 64x64
  'name' : 'Claire',
  'birthday' : '201900619',
  'gender' : 'Female',
  'job' : 'student'
}
]

// identified primary key, customer.id
// iterate the customers by using map
class App extends Component{
  render() {
    return (
      <div>
        {
          customers.map(c => {
            return (<Customer 
              key = {c.id}
              id = {c.id}
              image = {c.image}
              name = {c.name}
              birthday = {c.birthday}
              gender = {c.gender}
              job = {c.job}
            />);
          })
        }
      </div>
      );
    }
  }
export default App;
