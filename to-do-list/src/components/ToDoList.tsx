import ListComponent from "./ListComponent"

interface ToDoListProps {
    type: string;
    items: {
        listName: string;
        importance: string;
        id: number;
    }[];
    deleteButton: (id: number) => void;
}
export default function ToDoList({ type, items, deleteButton }: ToDoListProps) {


    return (
        <section className={`border-black border-b-[1px] h-[725px] w-1/3 flex flex-col items-center font-quicksand bg-gray-200`}>
            <header className="text-2xl py-4 mt-4 font-quicksand bg-violet-300 shadow-md w-[70%] text-center rounded-lg">{type}</header>
            <ol className="mt-4 w-full p-2 flex flex-col items-center justify-between text-xl">
                {items.map((item, index) => {
                    return (
                        <ListComponent key={item.id} item={item} index={index} deleteButton={deleteButton} />
                    )
                })}
            </ol>
        </section>
    )
}

