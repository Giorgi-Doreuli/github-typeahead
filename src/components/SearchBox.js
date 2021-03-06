import React, {useState, useEffect} from 'react'
import './SearchBox.css'
import Profiles from './Profiles';
import Navbar from './Navbar';

function SearchBox() {
    const [searchValue, setSearchValue] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [show, setShow] = useState(true);
    const [hoverValue, setHoverValue] = useState('');
    const [spinner1, setSpinner] = useState(false);
    const [noOneFound, setNoOneFound] = useState(false); 
    const finalSearchValue = searchValue + hoverValue;


    useEffect(() => {
      /*if noone was found by searchvalue, shows noone found text*/

      setNoOneFound(false);

      /* fetch data from api depend on what user types and while doing it, stops loading spinner after data is fetched*/
	  	const getSearchedProfile = async (searchValue) => {
            const api_url = 'https://api.github.com/search/users?q='+searchValue+'+in:login&per_page=10';
            const fetchProfile = await fetch(api_url);
            const profile = await fetchProfile.json();            
            setProfiles(profile.items);
            setSpinner(false);

            if(profile.items.length === 0){
              setNoOneFound(true);
            }
            
        }

        /* fetches and renders popular github profiles automaticly, before user types something*/
        const getPoPularProfile = async () => {
            const api_url = 'https://api.github.com/search/users?q=repos:%3E800+followers:%3E1000&page=1&per_page=10';
            const fetchProfile = await fetch(api_url);
            const profile = await fetchProfile.json();
                setProfiles(profile.items);                
                setSpinner(false);
        }

    
        /* if user types something, loading  spinner appears and waits 3 second 
          (because of api limit, thats why using api token is better option) to call function that fetches data*/
        if(searchValue !== ''){              
              setShow(true);
              setSpinner(true);
              const timer = setTimeout(() => {
              getSearchedProfile(searchValue);
            }, 3000);
        
            return () => clearTimeout(timer);
        }

        if(searchValue === ''){
          setSpinner(true);
          const timer2 = setTimeout(() => {
            getPoPularProfile();                      
            setShow(false);
          }, 3000);

          return () => clearTimeout(timer2);
        }
        
	}, [searchValue])

  

    return (
      <div className='fullPage'>
          <div className='searchBar'>
            <Navbar />           
                  <div className="container">
                    <input type="text" onChange={(event) => setSearchValue(event.target.value)} 
                          placeholder='Enter name' 
                          value={finalSearchValue} 
                          spellCheck="false"/>
                    <div className="search"></div>
                  </div>
                    {show ? <div className='space'></div> : <h2 className='popular-text'>Popular github users</h2>}
                  </div>
            <div>
              {noOneFound ? <div className='noOnefound'>
                                <h2>Your search </h2>
                                <b style={{color : 'red'}}>-{searchValue}-</b>
                                <h2>did not match any Profiles.</h2>
                            </div> : ''}
            </div>
          <div className='profilesList'>
          {spinner1 ? <div id="spinner"></div> : <Profiles  showProfiles={profiles}
                                                            setHoverValue={setHoverValue} 
                                                            searchValue={searchValue}
                                                            setSearchValue={setSearchValue}/>}
          </div>
    </div>
    );
}

export default SearchBox

