import { useState } from 'react'
import './App.css'
import { Table } from './components/Table';

export const App = ()=>{
  const onClickInputComplete = () => alert();
  return(
    <>
      <Table/>
      <button onClick={ onClickInputComplete }>入力完了</button>
    </>
  )
}