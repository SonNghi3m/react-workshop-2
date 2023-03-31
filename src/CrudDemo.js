import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AlertMessage from './AlertMessage';
import { set, useForm } from 'react-hook-form';

const CrudDemo = () => {
  const persons = [];
  const API_URL = 'http://localhost:8080/api/v1/person';
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [personList, setPersonList] = useState(persons);
  const [showDetails, setShowDetails] = useState(false);
  const [person, setPerson] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    title: "",
  });

  const [reload, setReload] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [personId, setPersonId] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [showTable, setShowTable] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const Form = () => {
    return (
      <>
        <br />
        <form onSubmit={handleSubmit(saveData)}>
          <div className='row'>
            <div className='col'>firstName
              <input type='text' className='form-control' id='firstName' {...register("firstName", { required: true })} placeholder='Enter firstName...' />
              {errors.firstName && errors.firstName.type === "required" && (<span className='text-danger'>firstName is Required!</span>)}
            </div>
            <div className='col'>lastName
              <input type='text' className='form-control' id='lastName' {...register("lastName", { required: true })} placeholder='Enter lastName...' />
              {errors.lastName && errors.lastName.type === "required" && (<span className='text-danger'>lastName is Required!</span>)}
            </div>
          </div>

          <br />

          <div className='row'>
            <div className='col'>email
              <input type='text' className='form-control' id='email' {...register("email", { required: true })} placeholder='Enter email...' />
              {errors.email && errors.email.type === "required" && (<span className='text-danger'>email is Required!</span>)}
              <br />
              title
              <input type='text' className='form-control ' id='title' {...register("title", { required: true })} placeholder='Enter title...' />

            </div>
          </div>
          <br />

          <div className='col'>
            <button type='submit' className='btn btn-success' >Add</button>
            <button type='button' className='btn btn-danger' onClick={() => {
              console.log('RESET:');
              document.getElementById('firstName').value = '';
              document.getElementById('lastName').value = '';
              document.getElementById('email').value = '';
              document.getElementById('title').value = '';
            }} >Reset</button>
          </div>

        </form>
      </>
    )
  };

  const saveData = async (data) => {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const title = data.title;

    const newPerson = { firstName, lastName, email, title }

    await axios.post(API_URL, newPerson).then(response => {
      if (response.status === 201) {
        updateList();
        setAlert({ type: 'success', message: 'Post operation is done!' });
      } else {
        setAlert({ type: 'warning', message: 'Display API Error Message...' });
      }

    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
    });
  };

  useEffect(() => {
    getRequestAction();
    setShowDetails(false)
  }, [reload]);

  const updateList = () => {
    setReload(!reload);
  }
  const PersonDetails = () => {
    return (
      <>
        {showDetails && (
          <div className='card'>
            <div className='card-header bg-dark text-white'>
              Info
              <div className='card-body'>
                <div className='bm-3'>
                  <span>ID : {person.id}</span>
                </div>
                <div className='bm-3'>
                  <span>Name : {person.firstName + " " + person.lastName}</span>
                </div>
                <div className='bm-3'>
                  <span>Email : {person.email}</span>
                </div>
                <div className='bm-3'>
                  <span>Title : {person.title}</span>
                </div>
              </div>
              <button type='button' className='btn btn-danger' onClick={updateList}>Hide</button>
            </div>

          </div>
        )}
      </>
    );
  }

  const Table = () => {
    return (
      <table className="table table-striped">
        <TableHeader />
        <TableRow list={personList} />
      </table>
    );
  }

  const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th colSpan="4" className="table-dark">
            <div className="d-flex justify-content-between align-items-center">
              <div>Person List</div>
            </div>
          </th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  }

  const TableRow = (props) => {

    if (!props.list && props.list.length === 0) {
      return (
        <tbody>
          <tr>
            <td colSpan="5">Data not Found</td>
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        {props.list.map((person) => {
          const row = (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.firstName + " "} {person.lastName} </td>
              <td>{person.email}</td>
              <td>
                <TableAction person={person} />
              </td>
            </tr>
          );
          return row;
        })}
      </tbody>
    );

  }


  const TableAction = (props) => {

    const handleDetailsClick = async () => {
      console.log("PERSON:", props.person.id);

      await axios.get(API_URL + '/' + props.person.id).then(response => {
        if (response.status === 200) {
          setPerson(response.data);
          setShowDetails(true);
          setAlert({ type: 'success', message: 'GET operation is done!' })
        } else {
          setAlert({ type: 'warning', message: 'Display API Error Message...' });
        }
      }).catch(error => {
        console.log("ERROR: ", error);
        setAlert({ type: 'danger', message: error.message })
      });

    }
    const handleDeleteClick = async () => {
      console.log("PERSON: Deleted ", props.person.id);

      await axios.delete(API_URL + '/' + props.person.id).then(response => {
        updateList();
        if (response.status === 204) {
          setAlert({ type: 'success', message: 'Put operation is done!' });
        } else {
          setAlert({ type: 'warning', message: 'Display API Error Message...' });
        }
      }).catch(error => {
        console.log("ERROR: ", error);
        setAlert({ type: 'danger', message: error.message });
      });


    };
    const enableEdit = () => {
      setShowForm(false);
      setShowTable(false);
      setShowButton(false);
      setShowEdit(true);
    }
    const handleEditClick = async () => {
      enableEdit();
      setPersonId(props.person.id);
    };

    return (
      <div>
        <button className='btn btn-primary' onClick={handleDetailsClick}>Details</button>
        <button className='btn btn-danger' onClick={handleDeleteClick}>Delete</button>
        <button className='btn btn-warning' onClick={handleEditClick}>Edit</button>
      </div>
    )
  }
  const upDate = async (data) => {
    const id = personId;
    console.log(id);
    const firstName = data.firstName;
    const lastName = data.lastName;
    const email = data.email;
    const title = data.title;

    const updatedPerson = { id, firstName, lastName, email, title }
    console.log(updatedPerson);

    await axios.put(API_URL, updatedPerson).then(response => {
      updateList();

      if (response.status === 204) {
        setAlert({ type: 'success', message: 'Put operation is done!' });
      } else {
        setAlert({ type: 'warning', message: 'Display API Error Message...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message });
    });
    setPersonId(null);
    goBack();
  }
  const goBack = () => {
    console.log('GOBACK');
    setShowForm(true);
    setShowTable(true);
    setShowButton(true)
    setShowEdit(false);
  }
  const empty = () => {
    console.log('EMPTY');
    document.getElementById('editfirstName').value = '';
    document.getElementById('editlastName').value = '';
    document.getElementById('editemail').value = '';
    document.getElementById('edittitle').value = '';
  }

  const getRequestAction = async () => {
    await axios.get(API_URL).then(response => {
      if (response.status === 200) {
        setPersonList(response.data);
        setAlert({ type: 'success', message: 'GET operation is done!' })
      } else {
        setAlert({ type: 'warning', message: 'Display API Error Message...' });
      }
    }).catch(error => {
      console.log("ERROR: ", error);
      setAlert({ type: 'danger', message: error.message })
    });
  }

  return (
    <>
      <div className='person-form'>
        {showForm && <Form />}
      </div>
      <div className='person-details-container'>
        <PersonDetails />
      </div>

      <div>
        {showTable && <Table />}
      </div>

      <div>
        {showEdit && <>

          <form onSubmit={handleSubmit(upDate)}>

            <div className='row'>
              <div className='col-2'> id
                <input type={'number'} className='form-control' placeholder={personId} readOnly />

              </div>
            </div>

            <div className='row'>
              <div className='col'> firstName
                <input type='text' className='form-control' id='editfirstName' {...register("firstName", { required: true })} placeholder='Enter firstName...' />
                {errors.firstName && errors.firstName.type === "required" && (<span className='text-danger'>firstName is Required!</span>)}
              </div>

              <div className='col'>lastName
                <input type='text' className='form-control' id='editlastName' {...register("lastName", { required: true })} placeholder='Enter lastName...' />
                {errors.lastName && errors.lastName.type === "required" && (<span className='text-danger'>lastName is Required!</span>)}
              </div>
            </div>

            <br />

            <div className='row'>
              <div className='col'> email
                <input type='text' className='form-control' id='editemail' {...register("email", { required: true })} placeholder='Enter email...' />
                {errors.email && errors.email.type === "required" && (<span className='text-danger'>email is Required!</span>)}
                <br />
                title
                <input type='text' className='form-control ' id='edittitle' {...register("title", { required: true })} placeholder='Enter title...' />

              </div>
            </div>
            <br />
            <div className='col'>
              <button type='submit' className='btn btn-success' >Add</button>
              <button type='button' className='btn btn-danger' onClick={empty} >Reset</button>
              <button type='button ' className='btn btn-danger' onClick={goBack} >return</button>
            </div>

          </form>

        </>
        }
      </div>
    </>
  );
}
export default CrudDemo;
