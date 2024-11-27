import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CabinetInfo = () => {
    const [cabinets, setCabinets] = useState([]);
    const [filteredCabinets, setFilteredCabinets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch cabinets once when component mounts
    useEffect(() => {
        const fetchCabinets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cabinets');
                setCabinets(response.data);
                setFilteredCabinets(response.data); // Initially show all cabinets
                setLoading(false);
            } catch (error) {
                setError('Error fetching cabinets data');
                setLoading(false);
            }
        };

        fetchCabinets();
    }, []); // Empty dependency array so it runs only once when the component mounts

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const results = cabinets.filter(cabinet =>
            cabinet.name.toLowerCase().includes(query)
        );
        setFilteredCabinets(results);
    };

    if (loading) {
        return <div>Loading cabinets...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Cabinets List</h2>
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearch}
                style={{
                    marginBottom: '10px',
                    padding: '8px',
                    width: '100%',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />
            {filteredCabinets.length === 0 ? (
                <p>No cabinets found.</p>
            ) : (
                <div style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px'
                }}>
                    <ul>
                        {filteredCabinets.map((cabinet) => (
                            <li key={cabinet._id} style={{
                                borderBottom: '1px solid #eee',
                                paddingBottom: '10px',
                                marginBottom: '10px'
                            }}>
                                <h3>Cabinet Information</h3>
                                <p>Name: {cabinet.name}</p>
                                <p>Address: {cabinet.address}</p>
                                <p>Phone: {cabinet.phone}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CabinetInfo;