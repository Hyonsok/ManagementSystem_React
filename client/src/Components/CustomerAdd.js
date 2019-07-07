import React from 'react';
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file:null,
            id:'',
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        }
        this.handleFormSubmit=this.handleFormSubmit.bind(this);
        this.handleFileChange=this.handleFileChange.bind(this);
        this.handleValueChange=this.handleValueChange.bind(this);
        this.addCustomer=this.addCustomer.bind(this);
        this.handleClickOpen=this.handleClickOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                // refresh the website to add a customer
                this.props.stateRefresh();
            })
        this.setState({
            file: null,
            id:'',
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
        
    }
    
    handleFileChange(e){
        this.setState ({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    handleValueChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer(){
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('id',this.state.id);
        formData.append('image',this.state.file);
        formData.append('name',this.state.userName);
        formData.append('birthday',this.state.birthday);
        formData.append('gender',this.state.gender);
        formData.append('job',this.state.job);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        return post(url,formData,config);
    }

    handleClickOpen(){
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState ({
            file: null,
            id:'',
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant = "contained" color="primary" onClick={this.handleClickOpen}>
                    Add
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add Customer</DialogTitle>
                    <DialogContent>
                        <input className = {classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "Choose Profile Image" : this.state.fileName}
                            </Button>
                        </label>
                        <br/>
                        <TextField label = 'ID' type="text" name = "id" value={this.state.id} onChange={this.handleValueChange}/><br/>
                        <TextField label = 'NAME' type="text" name = "userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label = 'BIRTHDAY' type="text" name = "birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label = 'GENDER' type="text" name = "gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label = 'JOB' type="text" name = "job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant ="contained" color="primary" onClick={this.handleFormSubmit}>Confirmed</Button>
                        <Button variant ="outlined" color="primary" onClick={this.handleClose}>Canceled</Button>
                    </DialogActions>
                </Dialog>

            </div>
           
        )
    }
}

export default withStyles(styles)(CustomerAdd);