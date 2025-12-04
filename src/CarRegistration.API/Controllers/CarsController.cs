using CarRegistration.Core.Entities;
using CarRegistration.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CarRegistration.API.Controllers;

[ApiController]
[Route("[controller]")] 
public class CarsController : ControllerBase
{
    private readonly ICarRepository _repository;
    private readonly ILogger<CarsController> _logger;

    public CarsController(ICarRepository repository, ILogger<CarsController> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    // GET: /cars?make=Toyota
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Car>>> Get([FromQuery] string? make)
    {
        _logger.LogInformation("Fetching cars with filter: {Make}", make ?? "All");
        
        var cars = await _repository.GetCarsAsync(make);
        
        return Ok(cars);
    }
}