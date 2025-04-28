import { useEffect, useState, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { createList } from '../features/lists/listAPI';
import Navbar from '../components/Navbar';

// List of valid status codes
const validStatusCodes = [
  100, 101, 102, 103,
  200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
  300, 301, 302, 303, 304, 305, 307, 308,
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410,
  411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
  500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
];

const Search = () => {
  const [query, setQuery] = useState('');
  const [filteredDogs, setFilteredDogs] = useState([]);

  const handleSearch = (value) => {
    if (!value) {
      setFilteredDogs([]);
      return;
    }
    const results = validStatusCodes.filter((code) => code.toString().startsWith(value));
    setFilteredDogs(results);
  };

  // Memoize the debounced function
  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), []);

  useEffect(() => {
    debouncedSearch(query);

    // Cleanup the debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch]);

  const addToList = useCallback(async (code)=>{
    let res = await createList({name: code, code: code})
  }, [])

  return (
    <div className='w-full flex justify-center items-center flex-col'>
      <Navbar />
      <input 
        type="text" 
        className='border-2 rounded-md py-2 px-3 w-100 my-4'
        placeholder="Search by status code..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />

<div className="dog-grid grid grid-cols-4 gap-6 p-4">
  {filteredDogs.map((code) => (
    <div key={code} className="dog-item relative group">
      <img 
        src={`https://http.dog/${code}.jpg`} 
        alt={`HTTP ${code}`} 
        className="w-full h-auto transition-all duration-300 group-hover:blur-sm"
      />
      <div 
        className="add-icon absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/50 transition-all duration-300">
        <button onClick={()=> addToList(code)} className="text-white text-2xl rounded-full p-3 bg-white/20 hover:bg-white/40">
          +
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default Search;
