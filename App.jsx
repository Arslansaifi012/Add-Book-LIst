
import { useEffect, useState } from "react"
import {InputGroup, Form, Container ,Button, Table } from "react-bootstrap"
let data;
function App() {

  let [input1, setinput1] = useState("") ;
  let [input2, setinput2] = useState("") ;
  let [input3,setinput3] = useState("") ;
  let [update, setupdate] = useState(false) ;

  let [td,settd] = useState(getdatatolocalstorage()) ;
  console.log(td,'oush')

  let addclickHandler = () =>{

    if (update) {
      const updateVal =  td.map((item) =>{
          if(item.title === data.title && item.Author === data.Author && item.ISBN === data.ISBN){
           let obj = {
            title : input1,
            Author : input2,
            ISBN : input3
           }

           return obj ;

          }else{
            return item ;
          }
        })

        settd(updateVal)
        setinput1("")
        setinput2("")
        setinput3("")

    }else{

      let inputObj = {
        title :input1,
        Author : input2,
        ISBN : input3
      }
      if(inputObj.Author === '' && inputObj.ISBN === '' &&  inputObj.title === ''){
        alert("Please Fill All Field's")

      }else{

        let newlist = [...td , inputObj]
        settd(newlist)
        setinput1("");
        setinput2("");
        setinput3("");

      }
    

      }
      

   
  }

  function getdatatolocalstorage(){
    const data = localStorage.getItem('books')
   if(data){
   return JSON.parse(data)
   }else{
    return [] ;
   }
}


function editclckHandler(e) {
  let ISBN = e.target.parentElement.parentElement.previousElementSibling.innerText ;
  let Author = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText ;
  let title = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText ;
 data = {title,ISBN,Author}

  setinput1( e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerText) ;
  setinput2(  e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.innerText ) ;
  setinput3( e.target.parentElement.parentElement.previousElementSibling.innerText ) ;

  setupdate(true) ;

  
}

function deleteClickHandler(ind) {
   const filterind = td.filter((_,i)=>{
   return  ind !== i ;
   })

   settd(filterind) ;

 }

  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(td));
},[td])



  return (
    <>

    <div style={{backgroundColor:"#ff9933"}}>
    
    
    <Container className="d-flex align-items-center justify-content-center"  style={{backgroundColor:"" , height:"100vh" ,width:"100%"}}>

      <div style={{backgroundColor:"#ff6b33", width:"60%", padding:"2rem" , borderRadius:"15px"}}>
      <h1 style={{textAlign:"center"}}>Add Book LIst</h1>

      <div><h4>Title</h4></div>
    <InputGroup className="mb-4 ">
        <Form.Control
        value={input1}
        onChange={(e)=>setinput1(e.target.value)}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <div><h4>Author</h4></div>
      <InputGroup className="mb-3 ">
        <Form.Control
        value={input2}
         onChange={(e)=>setinput2(e.target.value)}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <div><h4>ISBN##</h4></div>
      <InputGroup className="mb-3 ">
        <Form.Control
        value={input3}
         onChange={(e)=>setinput3(e.target.value)}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <Button variant="primary" type="submit" onClick={addclickHandler}>Add Book</Button>



      <Table striped bordered hover className="mt-2" >
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>ISBN#</th>
          <th>Modify</th>
        </tr>
      </thead>
      <tbody>
      {td.map((items,index) => (
    <tr key={index}>
      <td>{items.title}</td>
      <td>{items.Author}</td>
      <td>{items.ISBN}</td>
      <td>
        <span><i className='bx bx-edit-alt' style={{fontSize:"x-large", marginLeft:"10px" ,cursor:"pointer"}} onClick={editclckHandler}></i></span>
        <span><i className='bx bxs-message-alt-x' onClick={()=>{deleteClickHandler(index)}} style={{fontSize:"x-large", marginLeft:"10px", cursor:"pointer"}}></i></span>
      </td>
    </tr>
  ))}
     
      </tbody>
    </Table>


      </div>

    </Container>

    </div>

   

    </>
  )
}

export default App
