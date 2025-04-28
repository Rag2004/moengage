import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLists, removeList } from '../features/lists/listSlice';
import Navbar from '../components/Navbar';

export default function ListsPage() {
  const dispatch = useDispatch();
  const { lists } = useSelector(state => state.lists);

  useEffect(() => {
    dispatch(getLists());
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl mb-4">Your Lists</h2>
        {lists.map(list => (
          <div key={list._id} className="mb-8 border p-4 rounded">
            <div className="flex justify-between mb-2">
              <h3 className="text-xl">{list.name}</h3>
              <button onClick={() => dispatch(removeList(list._id))} className="text-red-600">Delete</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {list.images.map(img => (
                <img key={img} src={img} alt="" className="rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
