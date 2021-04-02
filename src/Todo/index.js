import reactDom from 'react-dom'
import React, { Component } from 'react'
import {
  Alert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Table,
} from 'reactstrap'

import { Todostyle } from './style'
class Todo extends Component {
  constructor() {
    super()
    this.state = {
      text: '',
      editID:-1,
      tblData: [],
    }
  }

  addText = () => {
    try {
      let data = this.state.tblData
    if(this.state.editID>-1){
      data.splice(this.state.editID,1,this.state.text);
    }
    else{ data.push(this.state.text.trim());}
      this.setState({
        tblData: data,
        text: '',editID:-1
      })
    } catch (error) {
      console.log(error)
    }
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    })
  }
  editRow = (i) => {
    try {
      this.setState({
        text: this.state.tblData[i],editID:i
      })
      
    } catch (error) {
      console.log(error);
    }
  }
  deleteRow = (i) => {
    try {
      let data = this.state.tblData
      data.splice(i,1)
      this.setState({tblData: data})
    } catch (error) {
      console.log(error);
    }
  }
  clearText = (e) => {
    this.setState({
      text: '',editID:-1
    })
  }
  tableUI = () => {
    try {
      let UI = []
      this.state.tblData.forEach((l, i) => {
        UI.push(
          <tr>
            <td>{i + 1}</td>
            <td>{l}</td>
            <td><Button color="danger" onClick={()=>this.deleteRow(i)}>Delete</Button>
            <Button color="warning" className="edit" onClick={()=>this.editRow(i)}>Edit</Button>
            </td>
          </tr>,
        )
      })
      return <>{UI}</>
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <Todostyle>
        <h2>My To Do List</h2>
        <div className="box">
          <div className="input">
            <InputGroup>
              <Input
                placeholder="Enter Text"
                value={this.state.text}
                onChange={this.handleChange}
              />
            </InputGroup>
            <Button color="secondary" onClick={this.addText}>
              {this.state.editID>-1?"Edit":"Add"}
            </Button>
            {this.state.text.trim() !== '' && (
              <Button color="secondary" onClick={this.clearText}>
                Clear
              </Button>
            )}
          </div>
        </div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>TODO LIST</th>
              <th>Action</th>
            </tr>
            {this.tableUI()}
          </thead>
        </Table>
      </Todostyle>
    )
  }
}

export default Todo
