import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/Header/Header'
import { Link } from 'react-router-dom'

import '../components/Header/Header.css'
import { ReactComponent as IconTwitter } from '../assets/icon-twitter.svg'
import { ReactComponent as IconCancel } from '../assets/icon-cancel.svg'

const AdvocatePage = () => {
   
  const params = useParams()
  const username = params.username
  const page = params.page

    let [advocate, setAdvocate] = useState(null)

    useEffect(() => {
        getAdvocate()
    }, [username, page])

    let getAdvocate = async () => {
        let response = await fetch(`https://cados.up.railway.app/advocates/${username}`)
        let data = await response.json()
        setAdvocate(data.advocate)
    }

  return (
    <>
        <div className="header--container">
            <Header />
                <Link to={`/advocates/?page=${page}`}>
                    <IconCancel className="icon--back"/>
                </Link>
        </div>
        {advocate && (
            <>
                <div className="advocate__page__name">
                    <strong>{advocate.name}</strong>
                </div><br />
                <img className="advocate__page__image" src={advocate.profile_pic} />
                <div className="advocate__page__bio">
                    <p><q>{advocate.bio}</q></p>
                </div>
                <div className="advocate__page__twitter">
                    <a href={`https://twitter.com/${advocate.username}/`} target="_blank" rel="noreferrer"><IconTwitter className="icon--twitter"/>@{advocate.username}</a>
                </div>
                <div className="advocate__page__twitter__followers">
                    Followers: {advocate.follower_count}
                </div>
            </>
        )}
    </>
  )
}

export default AdvocatePage