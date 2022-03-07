import React from 'react'
import './Profiles.css'

function Profiles(props) {
  const searchValueLength = props.searchValue.length;

  /* its like autosuggestion, when user hovers over profile, their name is autofinished in search bar */

  const setHoverValue = (profileName) =>{
    const slicedValue = profileName.slice(searchValueLength);
    props.setHoverValue(slicedValue);
  }

  /* open github profile when user clicks icon */
  const openInNewTab = (githubPageProfile) => {
      const url = 'https://github.com/' + githubPageProfile;
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null
  } 
    const setSearchValue = (searchValue) =>{
      props.setSearchValue(searchValue);
    }
/*when user click on profile, it finishes search value in search bar and  fetches data depend on search value*/
    const setSearchValueAndNewTab = (searchValue) =>{
      props.setSearchValue(searchValue);
      openInNewTab(searchValue);
    }

  return (
    <>
        <div className='profiles'>
          {props.showProfiles.map((profiles, i) => (
            <div className='card' key = {i}>
                <div className='list' onMouseEnter={() => setHoverValue(profiles.login)} 
                                      onMouseLeave={() => setHoverValue('')} 
                                      onClick={() => {setSearchValue(profiles.login); setHoverValue('')}}>
                        <div className="ds-top"></div>                        
                        <div className="avatar-holder">
                          <img src = {profiles.avatar_url} 
                                    alt='avatars' 
                                    className='avatars'/>
                        </div>            
                        <div className='name'> 
                          <div className='card_overlay'>
                            <div className='card_header'>
                              <div className="card_header_text">
                                <h2 className="card_title">{profiles.login}</h2>
                              </div>
                            </div>
                              <i className="fab fa-github fa-2x icon" onClick={() => setSearchValueAndNewTab(profiles.login)}></i>
                            </div>
                          </div>
                </div>
              </div>
              ))}
        </div>
    </>
  )
}

export default Profiles