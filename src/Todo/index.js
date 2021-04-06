import reactDom from "react-dom";
import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  Alert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Table,
} from "reactstrap";

import { Todostyle } from "./style";
class Todo extends Component {

  state = {
    name: "",
    data: [],
    isUpdate: false,
    updataId: ''
  }
  addData = () => {
    if (this.state.name) {
      let todo = {};
      todo.name = this.state.name
      todo.id = uuidv4()
      this.setState({ data: [...this.state.data, todo], name: "" })
    }
  }
  deleteData = (id) => {
    let data = [...this.state.data]
    const b = data.filter((h) => h.id !== id)
    this.setState({ data: b })
  }
  updataData = (id) => {
    let data = [...this.state.data]
    const b = data.filter((h) => h.id === id)
    this.setState({ name: b[0].name, isUpdate: true, updataId: id })
  }
  originalUpdate = () => {
    console.log(this.state.updataId)
    let data = [...this.state.data]
    const b = data.map((h) => {
      if (h.id === this.state.updataId) {
        h.name = this.state.name
        
      }
      return h;
    })
    this.setState({ data: b, isUpdate: false, name: "", updataId: '' })
  }
  render() {
    return (
      <Todostyle>
        {console.log(this.state, "aaaaa")}
        <h2>My To Do List</h2>
        <div className="box">
          <div className="input">
            <InputGroup>
              <Input value={this.state.name} placeholder="Enter Text" onChange={(e) => { this.setState({ name: e.target.value }) }} />
            </InputGroup>
            {!this.state.isUpdate ? <Button color="secondary" onClick={this.addData}>Add</Button> : <Button color="secondary" onClick={this.originalUpdate}>update</Button>}
          </div>
        </div>
        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>TODO LIST</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((x, i) => {
              return <>
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>{x.name}</td>
                  <td><Button color="primary" onClick={() => this.deleteData(x.id)}>delete</Button>
                    <Button color="secondary" onClick={() => this.updataData(x.id)}>edit</Button></td>
                </tr>
              </>

            })}

          </tbody>

        </Table>
      </Todostyle>
    );
  }
}

export default Todo;
