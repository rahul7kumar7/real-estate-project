import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order:'desc'
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);

    console.log(listings);
    const navigate = useNavigate();
    const handleChange = (e) => {
        if(e.target.id === "all" || e.target.id === "rent" || e.target.id === "sale") {
            setSidebarData({...sidebarData, type: e.target.id});
        }
        if (e.target.id === "searchTerm") {
            setSidebarData({...sidebarData, searchTerm: e.target.value});
        }

        if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer") {
            setSidebarData({...sidebarData, [e.target.id]: e.target.checked || e.target.checked === "true" ? true : false });
        }
        if (e.target.id === "sort_order") {
            const sort = e.target.value.split("_")[0] || "createdAt";
            const order = e.target.value.split("_")[1] || "desc";
            setSidebarData({...sidebarData, sort, order });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", sidebarData.searchTerm);
        urlParams.set("type", sidebarData.type);
        urlParams.set("parking", sidebarData.parking);
        urlParams.set("furnished", sidebarData.furnished);
        urlParams.set("offer", sidebarData.offer);
        urlParams.set("sort", sidebarData.sort);
        urlParams.set("order", sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get("searchTerm");
        const furnishedFromURL = urlParams.get("furnished");
        const offerFromURL = urlParams.get("offer");
        const sortFromURL = urlParams.get("sort");
        const orderFromURL = urlParams.get("order");
        const parkingFromURL = urlParams.get("parking");
        const typeFromUrl = urlParams.get("type");

        if (
            searchTermFromURL ||
            furnishedFromURL ||
            offerFromURL ||
            sortFromURL ||
            orderFromURL ||
            offerFromURL ||
            parkingFromURL
        ) {
            setSidebarData({
                searchTerm: searchTermFromURL || '',
                type: typeFromUrl || 'all',
                parking: parkingFromURL === "true" ? true : false,
                furnished: furnishedFromURL === "true" ? true : false,
                offer: offerFromURL === "true" ? true : false,
                sort: sortFromURL || 'created_at',
                order: orderFromURL || 'desc'
            });
        }
        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        };
        fetchListings();
    }, [location.search])




    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            onChange={handleChange}
                            value = {sidebarData.searchTerm}
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='all' className='w-5' onChange={handleChange}
                                   checked={sidebarData.type === 'all'}
                            />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' onChange={handleChange}
                                   checked={sidebarData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sale' className='w-5'
                                   onChange={handleChange}
                                   checked={sidebarData.type === 'sale'}/>
                            <span>Sale</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5' onChange={handleChange}
                                   checked={sidebarData.offer}/>
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' onChange={handleChange}
                            checked={sidebarData.parking}/>
                            <span>Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5'
                                   onChange={handleChange}
                                   checked={sidebarData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <select id='sort_order' className='border rounded-lg p-3'
                        defaultValue='created_at_desc'
                        onChange={handleChange}
                        >
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to hight</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Search
                    </button>
                </form>
            </div>
            <div className=''>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing results:</h1>
            </div>
        </div>
    );
}