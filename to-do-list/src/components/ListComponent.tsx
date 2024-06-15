import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface ListComponentProps {
    item: {
        listName: string,
        importance: string,
        id: number
    }
    index: number,
    deleteButton: (id: number) => void;
}

function ListComponent({ item, index, deleteButton }: ListComponentProps) {

    const id = item.id

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }


    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} id={id.toString()} key={item.id} className='flex justify-between w-[90%] group bg-white my-2 p-2 items-center rounded-md shadow-lg relative'>
            <input type="checkbox" name="checked" id="checked" className="absolute h-6 w-6" />
            <li key={index} className="ml-10">{item.listName}</li>
            <div className='flex items-center gap-2'>
            <button
                    className="group-hover:bg-deleteButton bg-contain h-6 w-6"
                    onClick={() => {
                        console.log("Delete button clicked", item.id); // Debug log
                        deleteButton(item.id);
                    }}
                ></button>
            </div>
        </div>
    )
}

export default ListComponent