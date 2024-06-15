import { useEffect, useState } from 'react'
import { DndContext, closestCenter, closestCorners } from '@dnd-kit/core'
import './App.css'

import Navbar from './components/Navbar'
import ToDoList from './components/ToDoList'
import { arrayMove } from '@dnd-kit/sortable'

function App() {
  const [items, setItems] = useState<itemList[]>(() => {
    const savedItems = localStorage.getItem('To-Do-List');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  interface itemList {
    listName: string,
    importance: string,
    id: number
  }

  function deleteButton(id: number) {
    let newArray: itemList[] = items.filter(item => item.id !== id);
    console.log(newArray)
    setItems(newArray);
  }

  function getItemPos(id:number) {
    return items.findIndex(item => item.id === id);
  }

  function handleDragEnd(event:any) {
    const { active, over } = event

    if (active.id === over.id) {
      return
    }

    setItems(items => {
      const originalPos = getItemPos(active.id)
      const newPos = getItemPos(over.id)

      return arrayMove(items, originalPos, newPos) //Function that takes items as array, and moves the original position to the new position in the array
    })
  }


  return (
    <>
      <Navbar items={items} setItems={setItems} />
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <main className='flex'>
            <ToDoList borderT="border-t-[1px]" borderR='border-r-[1px]' type="Least Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'leastImportant')} />
            <ToDoList borderT='border-t-[1px]' borderR='border-r-[1px]' type="Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'important')} />
            <ToDoList borderT='border-t-[1px]' borderR='' type="Very Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'veryImportant')} />
        </main>
      </DndContext>
    </>
  )
}

export default App
