import { useEffect, useState } from 'react';
import { HubConnectionBuilder, LogLevel, HubConnectionState } from '@microsoft/signalr';

interface CarStatus {
    registrationNumber: string;
    isRegistrationExpired: boolean; 
    make: string;
    model: string;
}

export default function LiveRegistration() {
    const [statuses, setStatuses] = useState<CarStatus[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected");

   
    const HUB_URL = 'http://localhost:5005/registrationHub';

    useEffect(() => {
       
        const connection = new HubConnectionBuilder()
            .withUrl(HUB_URL)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        
        connection.on("ReceiveRegistrationUpdate", (data: CarStatus[]) => {
            console.log("Received live update:", data);
            setStatuses(data);
        });

        
        const startConnection = async () => {
            try {
                setConnectionStatus("Connecting...");
                await connection.start();
                setConnectionStatus("Connected (Live)");
            } catch (err) {
                console.error("SignalR Connection Error: ", err);
                setConnectionStatus("Connection Failed");
            }
        };

        startConnection();

        
        return () => {
            if (connection.state === HubConnectionState.Connected) {
                connection.stop();
            }
        };
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-800">Live Registration Monitor</h1>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    connectionStatus.includes("Connected") 
                        ? "bg-green-100 text-green-800 border border-green-200" 
                        : "bg-red-100 text-red-800 border border-red-200"
                }`}>
                    ● {connectionStatus}
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-3  text-xs font-medium text-slate-500 uppercase tracking-wider">Car Details</th>
                            <th className="px-6 py-3  text-xs font-medium text-slate-500 uppercase tracking-wider">Rego Number</th>
                            <th className="px-6 py-3  text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {statuses.map((car) => (
                            <tr key={car.registrationNumber} className="hover:bg-slate-50 transition-colors duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                                    <span className="font-bold">{car.make}</span> {car.model}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-slate-600">
                                    {car.registrationNumber}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {car.isRegistrationExpired ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            EXPIRED
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            VALID
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {statuses.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-6 py-8 text-center text-slate-400">
                                    Waiting for live updates...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <p className="mt-4 text-xs text-slate-400 text-center">
                Updates are pushed automatically by the server every 5 seconds.
            </p>
        </div>
    );
}