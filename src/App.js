import './App.css';
import { useState, useEffect } from "react";
function App() {
  const [UserInput, setUserInput] = useState("");
  const [Data, setData] = useState([]);
  const [SearchMeals, setSearchMeals] = useState([]);
  const [AddData, setAddData] = useState([]);
  const [Invoice, setInvoice] = useState(true);
  const [Total,setTotal]=useState(0);
  useEffect(() => {
    let data = async () => {
      let response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      let result = await response.json()
      setData(result)
    }
    data()
  }, [])
  const SearchIteam = () => {
    let newArr = []
    for (var i of Data["meals"]) {
      if (i["strCategory"] === UserInput) {
        newArr.push(i)
      }
    }
    setSearchMeals(newArr)
    setUserInput("")
  }

  const Adddata = (Iteam) => {
    setAddData([...AddData, { 'Description': Iteam, 'price': 100 }])
    console.log(AddData);
  }
  return (
    <>
      <div className='maindiv'>
        <input type="text" placeholder='Search Any Food' value={UserInput} onChange={(n) => {
          setUserInput(n.target.value)
        }} />
        <button className='search' onClick={() => { 
          setInvoice(true)
          SearchIteam() }}>Search</button>
        <button className='invaice' onClick={() => {
          setInvoice(false)
        }} >Invoice</button>
      </div >
      {
        Invoice ?
          (() => {
            return (
              <div className='seconddiv'>
                {
                  SearchMeals.map((item) => {
                    return (
                      <div>
                        <img src={item.strMealThumb} />
                        <div className='ADD'>
                          <h3>{item.strMeal}</h3>
                          <p>Rs 100</p>
                          <button onClick={() => { Adddata(item.strMeal)
                          setTotal(Total+100)
                          }}>Add Iteam</button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })()
          :
          (() => {
            return (
              <div className='INVOICE'>
              <h1>INVOICE</h1>
              <h6>#1024</h6>
              <p><strong>BILLED TO : </strong> Really Great Company</p>
              <p><strong>PAY TO : </strong> Avery Davis <br/>764/51A st-27H New Delhi <br/>123-456-7890</p>
              <h5>Bank: SBI <br/>Account Name: Aarti Kumari <br/>BSB: 123-456 <br/>Account Number: 1234 5678</h5>
              <table>
                <tr>
                  <th>DESCRIPTION</th>
                  <th>AMOUNT</th>
                </tr>
                {
                  AddData.map((item)=>{
                    return(
                      <tbody>
                        <tr>
                          <td>
                          {item.Description}
                          </td>
                          <td>
                          {item.price}
                          </td>
                        </tr>
                      </tbody>
                    )
                  })
                }
              </table>
              <tr>
                <td>TOTAL</td>
                <td>{Total}</td>
              </tr>
              </div>
            )
          })()
      }
    </>
  )
}
export default App;
