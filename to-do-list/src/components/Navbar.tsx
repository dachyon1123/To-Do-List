import { useState, useEffect } from "react"
import '../styles/animations.css'

interface NavbarProps {
    items: { listName: string; importance: string; id: number }[];
    setItems: (items: { listName: string; importance: string; id: number }[]) => void;
}

interface Categories {
    name: string;
    value: string;
}

export default function Navbar({ items, setItems }: NavbarProps) {
    const [itemState, setItemState] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [catError, setCatError] = useState<string>('border-2 border-black');
    const [itemError, setItemError] = useState<string>('');
    const [id, setId] = useState<number>(() => {
        let maxId = 0;
        const savedItems = localStorage.getItem('To-Do-List');
        const list = savedItems ? JSON.parse(savedItems) : [];
    
        if (list.length !== 0) {
            maxId = list.reduce((max: number, item: { id: number }) => {
                return item.id > max ? item.id : max;
            }, 0);
            return maxId + 1; // Ensure the new id is one greater than the current max id
        } else {
            return 1;
        }
    });
    const [mouseDown, setMouseDown] = useState<number>(0);
    const [mouseUp, setMouseUp] = useState<number>(0);
    const [effect, setEffect] = useState<string>('')
    const [longPress, setLongPress] = useState<string>('long-press-animation')


    const categories: Categories[] = [
        { name: "Least Important", value: "leastImportant" },
        { name: "Important", value: "important" },
        { name: "Very Important", value: "veryImportant" },
    ];




    function addItems(e: any) {
        e.preventDefault();

        let hasError = false;

        if (itemState === '' || itemState === undefined) {
            setItemError('border-2 border-red-700');
            hasError = true;
        } else {
            setItemError('')
        }

        if (category === '' || category === undefined) {
            setCatError('border-2 border-red-700');
            if (hasError === false) {
                hasError = true;
            }
        } else {
            setCatError('border-2 border-black')
        }

        if (hasError) {
            return; 
        }

        setItems([...items, { listName: itemState, importance: category, id: id }]);
        setId(id + 1)
    }

    useEffect(() => {
        const delay = 3000;
        const pressTime = mouseUp - mouseDown

        if (pressTime > delay) {
            setItems([])
            setId(1)
        }
    }, [mouseUp])

    function handleMouseDown() {
        setMouseDown(Date.now());
        setLongPress('long-press-animation')
        setEffect('bg-left')
    }

    function handleMouseUp() {
        setMouseUp(Date.now());
        setLongPress('inital-background')
        setEffect('bg-right')
    }

    function handleMouseLeave() {
        setMouseUp(0)
        setLongPress('inital-background')
        setEffect('bg-right')
    }

useEffect(() => {
    localStorage.setItem("To-Do-List", JSON.stringify(items))
}, [items])


    return (
        <nav className="flex justify-between items-center py-4">
            <h1 className='text-3xl pl-10 font-quicksand'>To-Do-List</h1>

            <form className="flex gap-4 w-1/3 justify-center">
                <input type="text" name="listItem" id="listItem" className={`border-black border-2 p-2 ${itemError}`} onChange={(e) => { setItemState(e.target.value) }} placeholder="Add Item..." />
                <select name="dropdown" id="dropdown" onChange={(e) => setCategory(e.target.value)} className={`w-56 p-2 appearance-none bg-downArrow bg-no-repeat bg-right ${catError}`} >
                    <option value="">Select Importance</option>
                    {categories.map((cat, index) => (
                        <option value={cat.value} key={index}>{cat.name}</option>
                    ))}
                </select>
                <button
                    className="border-black border-[1px] rounded-md p-2 cursor-pointer text-md hover:bg-violet-300"
                    onClick={addItems}>
                    Add Item
                </button>
            </form>

            <section className="flex gap-4 pr-10">
                <button className={`${longPress} text-xl border-black border-[1px] rounded-md p-2 ${effect}`} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave}>Clear List</button>
                <button className="text-xl border-black border-[1px] rounded-md p-2" onClick={() => {navigator.clipboard.writeText(JSON.stringify(items))}}>Copy List</button>
            </section>
        </nav>
    )
}