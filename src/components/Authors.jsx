import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table"; 
import 'react-table/react-table.css'
import Modal from 'react-modal';





export default class Authors extends Component {
  constructor(props){
    super(props)
    this.state = {
      Authors: [],
      loading:true,
      First_name:"",
      Last_name:"",
      First_name_edit:"",
      Last_name_edit:"",
      id:"",
      editRes:""
    }
    
  }
  
  async getAuthorsData(){
    const res = await axios.get('http://localhost:3000/authors/')
    console.log(res.data)
    this.setState({loading:false, Authors: res.data})
  }
  componentDidMount(){
    this.getAuthorsData()
  }

  handleClickGroup(val){
    this.setState({First_name_edit: val.first_name,
    Last_name_edit: val.last_name, id:val._id});

    
    console.log(this.state.id)
    
  }
  async handleSaveEdit(e){


    e.preventDefault()
    const res = await axios.put('http://localhost:3000/author/'+this.state.id , {"first_name":this.state.First_name_edit, "last_name":this.state.Last_name_edit})
      .then((response) => {
        this.setState({editRes:response.status});
        console.log(response.data);
      });
    console.log("saved edit")
    this.componentDidMount()

  }
 async handleSave(e){
    e.preventDefault()
    const res = await axios.post('http://localhost:3000/author/' , {"first_name":this.state.First_name, "last_name":this.state.Last_name})
      .then((response) => {
        this.setState({editRes:response.status});
        console.log(response.data);
      });
    console.log("saved")
    this.componentDidMount()
  }
  handleChange(event) {
    let title = event.target.name;
    this.setState({
      [title]: event.target.value
    });
  }

  
  
  render(){

    const columns = [{  
      Header: 'sequnce',  
      accessor: 'seq',
     }
     ,{  
      Header: 'First name',  
      accessor: 'first_name' ,
      }
     
     ,{  
     Header: 'Last name',  
     accessor: 'last_name' ,
     }
     ,{  
     Header: 'Create on',  
     accessor: 'Create_on',
     },
     {
      Header: "Edit",
      accessor: "_id",
      Cell:  row => (
        <div>
           <button onClick={e=> this.handleClickGroup(row.row)}>Edit</button>
        </div>
        )
    }

 
  ]
  return (
    <div className="about">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
             <ReactTable  
      data={this.state.Authors}  
      columns={columns}  
   />
          </div>
          <div class="col-lg-5">
          <div>

          <h1> Edit Author </h1>
          <h2>{this.state.editRes}</h2>
          <form title="Edit Model">
            <label>First Name:
              <input
                type="text" 
                name= "First_name_edit"
                value={this.state.First_name_edit}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>Last Name:
              <input
                type="text" 
                name = "Last_name_edit"
                value={this.state.Last_name_edit}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <button onClick={this.handleSaveEdit.bind(this)}>
              Submit
            </button>
          </form>

          </div>
            <h1 class="font-weight-light">Add Author</h1>
            <form title="Add Model">
            <label>First Name:
              <input
                type="text" 
                name="First_name"
                value={this.state.First_name}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>Last Name:
              <input
                type="text" 
                name="Last_name"
                value={this.state.Last_name}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <button onClick={this.handleSave.bind(this)}>
              Submit
            </button>
          </form>



          </div>
        </div>
      </div>
    </div>
  );
}
}

