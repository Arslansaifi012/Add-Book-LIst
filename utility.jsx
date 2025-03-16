  
  let allInputValue = () =>{
    let inpObj = {
      title : input1,
      Author : input2,
      ISBN : input3,
    }
    addTolocalstorage(inpObj)
  }

  function addTolocalstorage(inputsValue) {

    let arr ;

    if (localStorage.getItem("details") === null) {
      arr = [] ;
    }else{

     arr = JSON.parse(localStorage.getItem("details"))

    }
    arr.push(inputsValue) ;

    localStorage.setItem("details",JSON.stringify(arr))

  }

  function getlocalStorage() {
    let data = JSON.parse(localStorage.getItem("details"));
    return data ;
  }
  function deleteClickHandler(ind) {
   const localdata = getlocalStorage() ;
    const filterind = localdata.filter((_,i)=>{
    return  ind !== i ;
    })

    settd(filterind) ;
 
  }


  let addclickHandler = () =>{
   allInputValue() ;

   settd(getlocalStorage()) ;
  }



  // useEffect(()=>{
  // },[])
