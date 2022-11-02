import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header'
import SearchBar from '../components/Header/SearchBar'
import '../components/Header/Header.css'
import ReactPaginate from 'react-paginate';
import { Grid } from '@mui/material';

const AdvocatePageList = () => {
    const [pageCount, setPageCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoaded, setisLoaded] = useState(false);
    const [advocates, setAdvocates] = useState([])
    const [activeAdvocate, setActiveAdvocate] = useState(false)
    const [total, setTotal] = useState(0)
    const [pagination, setPagination] = useState(null)
    const [previousLabel, setPreviousLabel] = useState(null)
    const [nextLabel, setNextLabel] = useState('>')
    
    useEffect(() => {
       let search_field = document.getElementById("outlined-input")
       console.log("Current page in useEffect", currentPage)
       if (!window.sessionStorage.getItem("searchDetails")) {
			window.sessionStorage.setItem(
				"searchDetails",
				JSON.stringify({
					searchQuery: "",
					searchResults: [],
                    pageActive: currentPage
				})
			)
		}

        const { pageActive } = JSON.parse(
			window.sessionStorage.getItem("searchDetails")
		)
        setCurrentPage(pageActive)
        console.log("Page active in use Effect", pageActive)

        const query = window.sessionStorage.getItem("searchQuery")
        search_field.value = query

        getAdvocates(query, pageActive)

        

    }, [currentPage])
    
    let getAdvocates = async (query='', currentPage=1) => {
        const { searchResults, pageActive } = JSON.parse(
			window.sessionStorage.getItem("searchDetails")
		)
        console.log("Search Query after typing text in searching", query)
        
        let response = await fetch(`https://cados.up.railway.app/advocates/?query=${query}&page=${currentPage}`)
        console.log('Current Page', currentPage)
        let data = await response.json()
        console.log('data', data)
        setAdvocates(data.advocates)
        setTotal(data.total)
        setPagination(data.pagination)
        
        window.sessionStorage.setItem("searchDetails", JSON.stringify({searchQuery: query, searchResults: data.advocates, pageActive: currentPage}))
        
        console.log("Page active in getAdvocates", pageActive)
        if (Object.keys(data.pagination.pages).length <= 1) {
            setPreviousLabel(null)
            setNextLabel(null)
        } else {
            setNextLabel('>')
        }
        if (currentPage == 1) {
            setPreviousLabel(null)
            
        } else {
            setPreviousLabel('<')
        }
        if (currentPage == Object.keys(data.pagination.pages).length) {
            setNextLabel(null)
        }
        setPageCount(Object.keys(data.pagination.pages).length);
        setisLoaded(true);
    }

    let searchData = (e) => {
        let query = e.target.query.value
        console.log('Query', query)
        window.sessionStorage.setItem("searchQuery", query)
        console.log("searchData -> searchQuery", window.sessionStorage.getItem("searchQuery"))
        getAdvocates(query)
        e.preventDefault()
    }

    const handleClick = (advocate, index) => () => {
        console.log(index);
        setActiveAdvocate(advocate.name === activeAdvocate 
                                       ? null 
                                       : advocate.name) 
    }
  
    const handlePageChange = (selectedObject) => {
        setCurrentPage(selectedObject.selected + 1);
        // console.log("handlePageChange currentPage", currentPage)
        window.sessionStorage.setItem("searchDetails", JSON.stringify({ pageActive: selectedObject.selected + 1}))
        // console.log("Selected object", selectedObject.selected + 1)
        const query = window.sessionStorage.getItem("searchQuery")
        // console.log("HandlePageChange -> searchQuery", query)
        getAdvocates(query, selectedObject.selected + 1)
    };


  return (
    <Grid container>
        <Grid item>
            <form onSubmit={searchData} id="search_form">
                <div className="header--container">
                    <Header />
                    <SearchBar />
                </div>
            </form>
        </Grid>
        <Grid item xs={12} sm={8} xl={8}>
            <div className="title--lable">
                <h1>Choose Your Advocate</h1>
            </div>
            <div className="available--advocates">
                <p>available: {total}</p>
            </div>
            <div className="found--advocates">
                <p>Developer advocates found: {pagination?.results_found} </p>
            </div>
                <Grid item xs={12} sm={8} xl={8}>
                    <div className="advocate__list">
                        {advocates.map((advocate, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveAdvocate(advocate.name === activeAdvocate 
                                            ? null 
                                            : advocate.name)}>
                                    {activeAdvocate === advocate.name && 
                                        <div className="active--advocate">
                                            <Link to={`/advocates/${advocate.username}/${currentPage}`}>
                                                <img                className="active__advocate__preview" src={advocate.profile_pic} /><br />
                                                <strong>{advocate.name}</strong><br />
                                            </Link>
                                        </div>
                                    }
                                    <div className="advocate__preview__wrapper">
                                        <Link onClick={handleClick(advocate, index)}>
                                            <img className="advocate__preview__image" src={advocate.profile_pic} />
                                        </Link>
                                    </div>   
                            </div>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12} sm={8} xl={8} lg={8}>
                    {isLoaded ? (
                        <ReactPaginate
                            pageCount={pageCount}
                            pageRange={1}
                            marginPagesDisplayed={1}
                            forcePage={currentPage-1}
                            onPageChange={handlePageChange}
                            containerClassName={ 'container--pagination'}
                            previousLabel={previousLabel}
                            previousLinkClassName={'page-previous'}
                            breakClassName={'page-break'}
                            nextLabel={nextLabel}
                            nextLinkClassName={'page-next'}
                            pageClassName={'page-break'}
                            disabledClassName={'disabled'}
                            activeClassName={'active'}
                        />
                    ) : (
                        <div>Nothing to display</div>
                    )} 
                </Grid>
        </Grid>
    </Grid>
  )
}

export default AdvocatePageList