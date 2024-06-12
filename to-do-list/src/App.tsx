import { useEffect, useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import ToDoList from './components/ToDoList'

function App() {
  const [items, setItems] = useState<itemList[]>([]);

  interface itemList {
    listName: string,
    importance: string,
    id: number
  }


  useEffect(() => {
    console.log(items)
  }, [items])

  function deleteButton(id:number) {
     let newArray: itemList[] = items.filter(item => item.id !== id);
     console.log(newArray)
     setItems(newArray);
  }

  return (
    <>
      <Navbar items={items} setItems={setItems} />
      <main className='flex'>
        <ToDoList borderT="border-t-[1px]" borderR='border-r-[1px]' type="Least Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'leastImportant')} />
        <ToDoList borderT='border-t-[1px]' borderR='border-r-[1px]' type="Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'important')} />
        <ToDoList borderT='border-t-[1px]' borderR='' type="Very Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'veryImportant')} />
      </main>
    </>
  )
}

export default App
