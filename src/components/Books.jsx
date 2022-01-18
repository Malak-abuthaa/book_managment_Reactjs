import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table"; 
import 'react-table/react-table.css'
import Modal from 'react-modal';
import Select from 'react-select';






export default class Books extends Component {
  constructor(props){
    super(props)
    this.state = {
      Books: [],
      loading:true,
      name:"",
      isbn:"",
      name_edit:"",
      author_id_edit:"",
      id:"",
      auther_id:"",
      authors:[],
      editRes:"",
      options:[],
      authors : [],
      value: null,
      lable:null
    }
    
  }
  parseAuthors(authors){
    return authors.map((authors) => {
      return { label: authors.first_name +" "+ authors.last_name, value: authors._id };
    });
  }

  async getBookssData(){
    const res = await axios.get('http://localhost:3000/books/')
    this.setState({loading:false, Books: res.data})
  }
  componentDidMount(){
    this.getBookssData()
    this.getAuthors()
  }

  async getAuthors() {

    const res = await axios.get('http://localhost:3000/authors/')
    this.setState({ authors: this.parseAuthors(res.data) })

    
  }

  handleClickGroup(val){
    this.setState({name_edit: val.name,
    author_id_edit: val.auther_id, id:val._id});

    
    console.log(this.state.id)
    
  }
  async handleSaveEdit(e){


    e.preventDefault()
    const res = await axios.put('http://localhost:3000/book/'+this.state.id , {"name":this.state.name_edit, "last_name":this.state.auther_id})
      .then((response) => {
        this.setState({editRes:response.status});
      });
    this.componentDidMount()

  }
 async handleSave(e){
    e.preventDefault()
    const res = await axios.post('http://localhost:3000/book/' , {"name":this.state.name, "isbn":this.state.isbn, "auther_id":this.state.auther_id})
      .then((response) => {
        this.setState({editRes:response.status});
      });
    this.componentDidMount()
  }
  handleChange(event) {
    let title = event.target.name;
    this.setState({
      [title]: event.target.value
    });
  }
  onChange(event) {
    this.setState({auther_id: event.value , label:event.label})
  }

  
  
  render(){

    const columns = [{  
      Header: 'name',  
      accessor: 'name',
     }
     ,{  
      Header: 'isbn',  
      accessor: 'isbn' ,
      }
     
     ,{  

     Header: 'author name',  
     accessor: 'auther_id' ,
     Cell:  row => (
      <div>
         {row.row.auther_id.first_name +" "+ row.row.auther_id.last_name }
      </div>
      )
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
      data={this.state.Books}  
      columns={columns}  
   />
          </div>
          <div class="col-lg-5">
          <div>

          <h1> Edit books </h1>
          <h2>{this.state.editRes}</h2>
          <form title="Edit Model">
            <label>Book Name:
              <input
                type="text" 
                name= "name_edit"
                value={this.state.name_edit}
                onChange={this.handleChange.bind(this)}
              />
            </label>

            <label>Author Name:  this not working 
              <input
                type="text" 
                name = "author_id_edit"
                value={this.state.author_id_edit}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <button onClick={this.handleSaveEdit.bind(this)}>
              Submit
            </button>
          </form>

          </div>
            <h1 class="font-weight-light">Add book</h1>
            <form title="Add Model">
            <label>Book Name:
              <input
                type="text" 
                name="name"
                value={this.state.name}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>isbn :
              <input
                type="text" 
                name="isbn"
                value={this.state.isbn}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>authers :
            <Select
            label={this.state.lable}
            options={this.state.authors}
            value={this.state.value}
            clearable={false}
            onChange={this.onChange.bind(this)}

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

