import { type Car } from '../types/Car.ts';

const API_BASE_URL = 'http://localhost:5005'; 

export const carService = {
    async getAllCars(make?: string): Promise<Car[]> {
        
        const url = make 
            ? `${API_BASE_URL}/cars?make=${encodeURIComponent(make)}`
            : `${API_BASE_URL}/cars`;

        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return response.json();
    }
};