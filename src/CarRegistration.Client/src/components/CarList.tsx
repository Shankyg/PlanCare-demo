import { useEffect, useState } from 'react';
import type { Car } from '../types/Car';
import { carService } from '../services/carService';

export default function CarList() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterMake, setFilterMake] = useState('');

    const fetchCars = async (make?: string) => {
        setLoading(true);
        try {
            const data = await carService.getAllCars(make);
            setCars(data);
        } catch (error) {
            console.error("Failed to fetch cars", error);
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchCars();
    }, []);

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchCars(filterMake);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Car Inventory</h1>

            {/* Filter Section */}
            <form onSubmit={handleFilterSubmit} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Filter by Make (e.g. Toyota)"
                    className="border border-slate-300 rounded px-4 py-2 w-full max-w-xs"
                    value={filterMake}
                    onChange={(e) => setFilterMake(e.target.value)}
                />
                <button 
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Search
                </button>
                {filterMake && (
                    <button 
                        type="button"
                        onClick={() => { setFilterMake(''); fetchCars(); }}
                        className="text-slate-500 hover:text-slate-700 px-4"
                    >
                        Clear
                    </button>
                )}
            </form>

            {/* Table Section */}
            {loading ? (
                <div className="text-center py-10 text-slate-500">Loading cars...</div>
            ) : (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Make</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Model</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rego Number</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {cars.map((car) => (
                                <tr key={car.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{car.make}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{car.model}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{car.registrationNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {cars.length === 0 && (
                        <div className="text-center py-8 text-slate-400">No cars found.</div>
                    )}
                </div>
            )}
        </div>
    );
}