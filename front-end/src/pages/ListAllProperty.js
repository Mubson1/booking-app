import Navbar from "../components/Navbar"
import SearchItem from "../components/SearchItem"
import useFetch from "../hook/useFetch"

const ListAllProperty = () => {

  const {data, loading} = useFetch(`/hotel`)  //here, min and max are the varibale from useState that we will created above
  

  return (
    <div>
      <Navbar />
      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-5xl flex gap-5'>

          <div className='w-full'>
            {loading ? "loading" :
              <>
                {data.map(item => (
                  //This item={item} will set the data about a hotel for each SearchItem
                  <SearchItem item={item} key={item._id} />
                ))}    
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListAllProperty
