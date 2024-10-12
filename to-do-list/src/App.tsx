import { useState } from 'react'
import { DndContext, closestCorners, useSensor, useSensors, MouseSensor } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

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
    setItems(newArray);
  }

  function getItemPos(id: number) {
    return items.findIndex(item => item.id === id);
  }

  function handleDragEnd(event: any) {
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

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(
    mouseSensor
  )

  return (
    <>
      <Navbar items={items} setItems={setItems} />
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <main className='flex'>
            <ToDoList type="Least Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'leastImportant')} />
            <ToDoList type="Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'important')} />
            <ToDoList type="Very Important" deleteButton={deleteButton} items={items.filter(item => item.importance === 'veryImportant')} />
          </main>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default App
