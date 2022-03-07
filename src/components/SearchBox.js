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

        const getPoPularProfile = async () => {
            const api_url = 'https://api.github.com/search/users?q=repos:%3E800+followers:%3E1000&page=1&per_page=10';
            const fetchProfile = await fetch(api_url);
            const profile = await fetchProfile.json();
                setProfiles(profile.items);                
                setSpinner(false);
        }

        
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
                  <div classNsame="container">
                    <input type="text" onChange={(event) => setSearchValue(event.target.value)} 
                          placeholder='Enter name' 
                          value={finalSearchValue} 
                          spellCheck="false"/>
                    <div className="search"></div>
                  </div>
                    {show ? <div className='space'></div> : <h2 className='popular-text'>Popular github users</h2>}
                  </div>
          <div className='profilesList'>
            <div>
              {noOneFound ? <h2 className='noOnefound'>Your search - <b style={{color : 'red'}}>{searchValue}</b>- did not match any Profiles.</h2> : ''}
            </div>
          {spinner1 ? <div id="spinner"></div> : <Profiles  showProfiles={profiles}
                                                            setHoverValue={setHoverValue} 
                                                            searchValue={searchValue}
                                                            setSearchValue={setSearchValue}/>}
          </div>
    </div>
    );
}

export default SearchBox

