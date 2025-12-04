using CarRegistration.Core.Entities;
using CarRegistration.Core.Interfaces;

namespace CarRegistration.Infrastructure.Data;

public class MockCarRepository : ICarRepository
{
    private readonly List<Car> _cars;

    public MockCarRepository()
    {
        _cars = new List<Car>
        {
            new Car 
            { 
                Make = "Toyota", 
                Model = "Corolla", 
                RegistrationNumber = "ABC-123", 
                RegistrationExpiry = DateTime.UtcNow.AddDays(30) 
            },
            new Car 
            { 
                Make = "Toyota", 
                Model = "Camry", 
                RegistrationNumber = "XYZ-789", 
                RegistrationExpiry = DateTime.UtcNow.AddDays(-5) 
            },
            new Car 
            { 
                Make = "Tesla", 
                Model = "Model 3", 
                RegistrationNumber = "ELON-001", 
                RegistrationExpiry = DateTime.UtcNow.AddDays(100) 
            },
            new Car 
            { 
                Make = "Ford", 
                Model = "Ranger", 
                RegistrationNumber = "TRK-999", 
                RegistrationExpiry = DateTime.UtcNow.AddMinutes(1) 
            },
            new Car 
            { 
                Make = "Honda", 
                Model = "Civic", 
                RegistrationNumber = "VTEC-YO", 
                RegistrationExpiry = DateTime.UtcNow.AddDays(-100) 
            }
        };
    }

    public Task<IEnumerable<Car>> GetCarsAsync(string? make = null)
    {
        
        if (string.IsNullOrWhiteSpace(make))
        {
            return Task.FromResult<IEnumerable<Car>>(_cars);
        }

        
        var filteredCars = _cars.Where(c => c.Make.Equals(make, StringComparison.OrdinalIgnoreCase));
        
        return Task.FromResult(filteredCars);
    }
}