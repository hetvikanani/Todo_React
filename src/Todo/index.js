import reactDom from "react-dom";
import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";


import { Todostyle } from "./style";
class Todo extends Component {
  state = {
    name: "",
    data: [],
    isUpdate: false,
    updataId: "",
    isDeleteModal: false,
    deleteId: "",
  };
  addData = () => {
    const xyz = this.state.data.filter((y) => y.name === this.state.name);
    if (xyz.length > 0) {
      alert(`${xyz[0].name} is already exit please enter differet todo name`);
      return;
    }
    if (this.state.name) {
      let todo = {};
      todo.name = this.state.name;
      todo.id = uuidv4();
      this.setState({ data: [...this.state.data, todo], name: "" });
    }
  };
  resetData = () => {
    this.setState({ name: "" });
  };
  deleteData = (id) => {
    let data = [...this.state.data];
    const b = data.filter((h) => h.id !== this.state.deleteId);
    this.setState({ data: b });
    this.closeDeleteModal();
  };
  updataData = (id) => {
    let data = [...this.state.data];
    const b = data.filter((h) => h.id === id);
    this.setState({ name: b[0].name, isUpdate: true, updataId: id });
  };
  originalUpdate = () => {
    console.log(this.state.updataId);
    let data = [...this.state.data];
    const b = data.map((h) => {
      if (h.id === this.state.updataId) {
        h.name = this.state.name;
      }
      return h;
    });
    this.setState({ data: b, isUpdate: false, name: "", updataId: "" });
  };
  closeDeleteModal = () => {
    this.setState({ isDeleteModal: false, deleteId: "" })
  }
  openDeleteModal = (id) => {
    this.setState({ isDeleteModal: true, deleteId: id })


  }
  render() {
    const { isDeleteModal } = this.state
    return (
      <Todostyle>
        <h2>My To Do List</h2>
        <div className="box">
          <div className="input">
            <InputGroup>
              <Input
                value={this.state.name}
                placeholder="Enter Text"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </InputGroup>
            {!this.state.isUpdate ? (
              <Button color="secondary" onClick={this.addData}>
                Add
              </Button>
            ) : (
              <Button color="secondary" onClick={this.originalUpdate}>
                Update
              </Button>
            )}
            <Button color="secondary" onClick={this.resetData}>
              Reset
            </Button>
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
            {this.state.data.map((x, i) =>
            (

              <tr key={x.id}>
                <th scope="row">{i + 1}</th>
                <td>{x.name}</td>
                <td>
                  <Button
                    color="danger"
                    onClick={() => this.openDeleteModal(x.id)}
                  >
                    Delete
                      </Button>
                  <Button
                    color="primary"
                    style={{ marginLeft: "10px" }}

                    onClick={() => this.updataData(x.id)}
                  >
                    Edit
                      </Button>
                </td>
              </tr>

            )
            )}
          </tbody>
        </Table>

        <Modal isOpen={isDeleteModal} toggle={this.closeDeleteModal} >

          <ModalHeader toggle={this.closeDeleteModal}>Modal title</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this?
            </ModalBody>

          <ModalFooter>
            <Button color="danger" onClick={this.deleteData}>Delete</Button>
            <Button color="secondary" onClick={this.closeDeleteModal}>Cancel</Button>
          </ModalFooter>
        </Modal>


      </Todostyle>
    );
  }
}

export default Todo;
