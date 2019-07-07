import React, {Component} from 'react';
import Customer from './Components/Customer';
import CustomerAdd from './Components/CustomerAdd';
import './App.css';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgess from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';


// maintained the size 
// created scroll bar if bigger
const styles = theme => ({
  root: {
  width: '100%',
  minWidth: 1080
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  tableHaed: {
    fontSize: '1.0rem'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  }
});

/*
material-ui/demos/progress/circular-determinate 

1) constructor()

2) componentWillMount()

3) render()

4) componentDidMount()

*/

/*

if props or state modified => shouldComponent()

*/






// identified primary key which is customer.id
// iterate the customers by using map
class App extends Component{
  
  constructor(props) {
    super(props);
    this.state ={
      customers:'',
      completed: 0
    }
    this.stateRefresh = this.stateRefresh.bind(this);
  }

  stateRefresh() {
    this.setState({
      customers:'',
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress,20);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch ('/api/customers');
    const body = await response.json();
    return body;
  }

  progress =() => {
    const {completed} = this.state;
    this.setState({completed: completed >= 100 ? 0 : completed + 1});
  }
  render() {
    const {classes} = this.props;
    const cellList = ["ID","Image", "Name", "Birthday", "Gender", "Job"];
    return (
      <div className = {classes.root}>
        <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Customer Management System
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'Search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
      <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
        <Paper className = {classes.paper}>
          <Table className = {classes.table}>
              <TableHead>
                <TableRow>
                  {cellList.map(c => {
                    return <TableCell className = {classes.TableHead}>{c}</TableCell>
                  })}
                </TableRow>
              </TableHead>
              
            <TableBody>
            {
              this.state.customers ? this.state.customers.map(c => {
                return (<Customer
                  stateRefresh = {this.stateRefresh} 
                  key = {c.id}
                  id = {c.id}
                  image = {c.image}
                  name = {c.name}
                  birthday = {c.birthday}
                  gender = {c.gender}
                  job = {c.job}/>);
              }) : 
              <TableRow>
                <TableCell colSpan = "6" align = "center">
                  <CircularProgess className = {classes.progress} variant="determinate" value={this.state.completed}/>
                
                </TableCell>
              </TableRow>
              }
            </TableBody> 
          </Table>
        </Paper>
        
      </div>
      );
    }
  }
export default withStyles(styles)(App);
