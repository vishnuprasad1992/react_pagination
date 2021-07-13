import "./style.css"
import { useState, useEffect } from 'react'

const Pagination = () => {
    const [data, setData] = useState([]);
    // const [itemPerPage, setItemPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    var itemPerPage = 5;
    var pageNumberLimit=5
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => setData(json))
    }, [])

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

    let pages = [];
    for (let i = 0; i < Math.ceil(data.length / itemPerPage); i++) {
        const element = i + 1;
        pages.push(element)
    }

    const handleClick = e => {
        setCurrentPage(Number(e.target.id))
    }

    const renderPageNumbers =pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return(
            <li
                key={number}
                id={number}
                onClick={(e) => handleClick(e)}
                className={currentPage === number ? "active" : null}
            >
                {number}
            </li>)
        }
        else{
            return null;
        }
    });

    const renderedData = rData => {
        return (<ul>{rData.map((d, i) => (
            <li key={i}>{d.title}</li>
        ))}</ul>)
    }

    const handleNextBtn = () =>{
        setCurrentPage(currentPage + 1);
        if(currentPage+1 > maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit)
        }

    }
    const handlePrevBtn = () =>{
        setCurrentPage(currentPage - 1)
        if((currentPage-1)%pageNumberLimit===0){
            setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit)
        }
    }

    let pageIncrementBtn = null;
    if(pages.length >maxPageNumberLimit){
        pageIncrementBtn=<li onClick={handleNextBtn} >&hellip;</li>
    }

    let pageDecrementBtn = null;
    if(pages.length >maxPageNumberLimit){
        pageDecrementBtn=<li onClick={handlePrevBtn} >&hellip;</li>
    }
    return (
        <div>
            <ul className="pageNumbers">
            <li><button disabled={pages[0]===currentPage ? true : false} onClick={handlePrevBtn}>Prev</button></li>
            {currentPage>1 && pageDecrementBtn}
                {renderPageNumbers}
                {currentPage<pages[pages.length-1] && pageIncrementBtn}
                <li><button disabled={currentPage===pages[pages.length - 1] ?true:false} onClick={handleNextBtn}>Next</button></li>
            </ul>
            {renderedData(currentItems)}
        </div>
    )
}

export default Pagination
