import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div >
            <div className=" bg-white border-2 rounded-md shadow-md">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search Blog...."
                        name="search"
                        className="bg-gray-200 p-4 text-base border-none rounded-l-md"
                    />
                    <button
                        type="submit"
                        className="bg-gray-200 p-4   text-base border-none rounded-r-md"
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>

            <div className="mt-4 bg-white border-2 rounded-md p-2 shadow-md hidden md:block">
                <h3 className="text-left text-xl mt-2 mb-0 pl-4">Trending Blog for you</h3>
                <div className="trending-contents">
                    <div className=" p-2 hover:bg-gray-200">
                        <p>Cricket . Trending</p>
                        <h4>#ICCRankings</h4>
                        <p>1,099 Blogs</p>
                    </div>
                    <div className=" p-2 hover:bg-gray-200">
                        <p>Entertainment . Trending</p>
                        <h4>#ChrisHemsworth</h4>
                        <p>1,099 Blogs</p>
                    </div>
                    <div className=" p-2 hover:bg-gray-200">
                        <p>Football . Trending</p>
                        <h4>#LionelMessi</h4>
                        <p>2,369 Blogs</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
