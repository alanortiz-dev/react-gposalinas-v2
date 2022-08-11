import React from 'react';
import './Home.css';
import NavigationBar from '../../commons/NavigationBar';
import {Button,Row,Container,Col,Form,Navbar,Table} from 'react-bootstrap';

const Home = () => {

    let ac = localStorage.getItem('account')
    let account = JSON.parse(ac)

    const [tasks, setTasks] = React.useState([]);
    const [newTask, setnewTask] = React.useState('');
    const [updateTask, setupdateTask] = React.useState('');
  
    React.useEffect(() => {
        const readTasks = () => {
          if (localStorage.getItem('tasks')) {
              setTasks(JSON.parse(localStorage.getItem('tasks')))
          }
        }
        readTasks()
    }, []);
  
    const onCreate = () => {
        if(newTask !== ""){
            tasks.push(newTask)
            localStorage.setItem('tasks',JSON.stringify(tasks))
            setnewTask('')
        }
       
    };
  
    function onDelete (task) {
      let index = tasks.indexOf(task);
      tasks.splice(index,1)
      localStorage.setItem('tasks',JSON.stringify(tasks))
      setnewTask('')
      setTasks(JSON.parse(localStorage.getItem('tasks')))
      
    }
  
    const onUpdate = (task) => {
      let index = tasks.indexOf(task);
      let tasks2= JSON.parse( localStorage.getItem('tasks'))
      
      tasks2[index] = updateTask
      
      localStorage.setItem('tasks',JSON.stringify(tasks2))
      setTasks(JSON.parse(localStorage.getItem('tasks')))
    
    }

    return (
        <>
            <div className='HomeContainer'>
                <div className='HomeContent'>
                    <NavigationBar text='Menu' />
                    <div className='HomeBody'>
                     
                        <Row>
                            <Col>
                            <h5>Agregar nuevo producto</h5>
                            </Col>
                            <Col>
                            <Form>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Control autoComplete="off" type="text"   value={newTask}  onChange={e =>
                                    setnewTask(e.target.value)} />     
                                </Form.Group>
                                
                            </Form>
                            </Col>
                            <Col>
                            <Button variant="success" onClick={onCreate}>Agregar producto</Button>
                            </Col>
                        </Row>
                        <br></br>
                        <Row>
                            <Col>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                    <th>Nombre</th>
                                    <th>Borrar</th>
                                    <th>Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map(task => (
                                    <tr key={task } >
                                    <td >{task}</td>
                                    <td>  <Button variant="danger" onClick={() => onDelete(task)}>Borrar producto</Button></td>
                                    <td>
                                        <input  type="text" className=" "    onChange={e => setupdateTask(e.target.value)} placeholder={task}></input>
                                        <Button className="text-white ml-4" variant="warning" onClick={() => onUpdate(task)}>Actualizar</Button>
                                    </td>
                                    </tr >
                                    ))}
                                </tbody>
                            </Table>
                            </Col>
                        </Row>
                                          
                    
                    </div>
                    
                </div>
            </div>
        </>
    )
};

export default Home;