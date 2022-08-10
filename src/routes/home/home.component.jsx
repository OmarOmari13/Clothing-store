import { Outlet } from "react-router-dom"
import Directory from "../../components/directory/directoyr.component"

const Home = ()=>{

    
    return (
      <div>
      <Outlet  />
      <Directory />
      </div>
      
    )
  }

  export default Home