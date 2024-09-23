import React from 'react'
import './flow.scss';
import Card from '../../components/card';
import WriteBtn from '../../components/writeBtn'

const flow = () => {
  return (
    <div className="flow">
      
      <Card className="flow_card" 
        createdAt ={345}
        username = "kjkjh"
        text="kkjhkjh"
   ></Card>
        <Card className="flow_card" 
        createdAt ={345}
        username = "kjkjh"
        text="kkjhkjh"
   ></Card>
   <WriteBtn></WriteBtn>
   
    </div>
  )
}

export default flow