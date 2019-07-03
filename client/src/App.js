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
});

// identified primary key which is customer.id
// iterate the customers by using map
class App extends Component{
  state = {
    customers: ""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
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
            this.state.customers ? this.state.customers.map(c => {
              return (<Customer 
                key = {c.id}
                id = {c.id}
                image = {c.image}
                name = {c.name}
                birthday = {c.birthday}
                gender = {c.gender}
                job = {c.job}
              />);
            }) : ""}
          </TableBody> 
        </Table>
      </Paper>
      );
    }
  }
export default withStyles(styles)(App);
