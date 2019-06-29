import React, {Component} from 'react';
import Customer from './Components/Customer';
import './App.css';

const customer = {
  'name' : 'Hyonsok',
  'birthday' : '20190629',
  'gender' : 'Male',
  'job' : 'student'
}

class App extends Component{
  render() {
    return (
      <Customer
        name = {customer.name}
        birthday = {customer.birthday}
        gender = {customer.gender}
        job = {customer.job}
      />

      );
    }
  }
export default App;
