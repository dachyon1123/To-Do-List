import dots from '../assets/svgs/dots.svg'

interface itemList {
    listName: string,
    importance: string,
    id: number,
  }

interface ToDoListProps {
    borderT: string;
    borderR: string;
    type: string;
    items: {
        listName: string;
        importance: string;
        id: number;
    }[];
    deleteButton: (id: number) => void;
}
export default function ToDoList({ borderT, borderR, type, items, deleteButton }: ToDoListProps) {

    return (
        <section className={`border-black ${borderT} ${borderR} border-b-[1px] h-[900px] w-1/3 flex flex-col items-center font-quicksand`}>
            <header className="text-2xl pt-4 font-quicksand">{type}</header>

            <ol className="mt-10 w-full p-2 pl-10 flex flex-col items-center justify-between text-xl list-decimal">
                {items.map((item, index) => {
                    return (
                        <div className='flex justify-between w-full'>
                            <li key={index}>{item.listName}</li>
                            <div className='flex items-center gap-2'>
                                <img src={dots} alt="" className='h-10 w-auto cursor-move'/>
                                <button className='bg-deleteButton bg-contain h-6 w-6' onClick={() => deleteButton(item.id)}></button>
                            </div>
                        </div>
                    )
                })}
            </ol>
        </section>
    )
}