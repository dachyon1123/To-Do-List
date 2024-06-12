import { useState, useEffect } from "react"
import '../styles/animations.css'

export default function Navbar({ items, setItems }) {
    const [itemState, setItemState] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [catError, setCatError] = useState<string>('');
    const [itemError, setItemError] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [mouseDown, setMouseDown] = useState<number>(0);
    const [mouseUp, setMouseUp] = useState<number>(0);
    const [effect, setEffect] = useState<string>('')


    interface Categories {
        name: String,
        value: String
    }

    const categories: Categories[] = [
        { name: "Least Important", value: "leastImportant" },
        { name: "Important", value: "important" },
        { name: "Very Important", value: "veryImportant" },
    ];



    function addItems(e: any) {
        e.preventDefault();

        let hasError = false;

        if (itemState === '' || itemState === undefined) {
            setItemError('bg-red-300');
            hasError = true;
        } else {
            setItemError('')
        }

        if (category === '' || category === undefined) {
            setCatError('bg-red-300');
            if (hasError === false) {
                hasError = true;
            }
        } else {
            setCatError('')
        }

        if (hasError) {
            return; // Exit the function if there is an error
        }
        
        setItems([...items, { listName: itemState, importance: category, id: id }]);
        setId(id + 1)
    }

    useEffect(() => {
        const delay = 3000;
        const pressTime = mouseUp - mouseDown

        console.log(pressTime)

        if (pressTime > delay) {
            setItems([])
        }
    }, [mouseUp])

    // useEffect(() => {
    //     console.log(mouseDown)
    // }, [mouseDown])

    // useEffect(() => {
    //     console.log(mouseUp)
    // }, [mouseUp])

    return (
        <nav className="flex justify-between items-center py-4">
            <h1 className='text-3xl pl-10 font-quicksand'>To-Do-List</h1>

            <form className="flex gap-4 w-1/3 justify-center">
                <input type="text" name="listItem" id="listItem" className={`border-black border-2 p-2 ${itemError}`} onChange={(e) => { setItemState(e.target.value) }} placeholder="Add Item..." />
                <select name="dropdown" id="dropdown" onChange={(e) => setCategory(e.target.value)} className={`w-56 p-2 appearance-none bg-downArrow bg-no-repeat bg-right bg-cyan-200 ${catError}`} >
                    <option value="">Select Importance</option>
                    {categories.map((cat, index) => (
                        <option value={cat.value} key={index}>{cat.name}</option>
                    ))}
                </select>
                <button
                    className="border-black border-[1px] rounded-md p-2 cursor-pointer text-md"
                    onClick={addItems}>
                    Add Item
                </button>
            </form>

            <section className="flex gap-4 pr-10">
                <button className={`long-press-animation text-xl border-black border-[1px] rounded-md p-2 ${effect}`} onMouseDown={() => {setMouseDown(Date.now()); setEffect('bg-left')}} onMouseUp={() => {setMouseUp(Date.now()); setEffect('')}}>Clear List</button>
                <button className="text-xl border-black border-[1px] rounded-md p-2">Copy List</button>
            </section>
        </nav>
    )
}