import React, {Component} from 'react';
import Customer from './Components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';


// maintained the size 
// created scroll bar if bigger
const styles = theme => ({
  root: {
  width: '100%',
  marginTop: theme.spacing.unit * 3,
  overflowX: "auto"
},
  table: {
    minWidth: 1080
  }
})


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

// identified primary key which is customer.id
// iterate the customers by using map
class App extends Component{
  render() {
    const {classes} = this.props;
    return (
      <Paper className = {classes.root}>
        <Table className = {classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Birthday</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Job</TableCell>
              </TableRow>
            </TableHead>
            
          <TableBody>
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
          </TableBody> 
        </Table>
      </Paper>
      );
    }
  }
export default withStyles(styles)(App);
