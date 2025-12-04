using CarRegistration.Core.Entities;

namespace CarRegistration.Core.Interfaces;

public interface ICarRepository
{
    Task<IEnumerable<Car>> GetCarsAsync(string? make = null);
    
   }