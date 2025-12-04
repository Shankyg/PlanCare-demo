using CarRegistration.API.Controllers;
using CarRegistration.Core.Entities;
using CarRegistration.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace CarRegistration.Tests.Controllers;

public class CarsControllerTests
{
    private readonly Mock<ICarRepository> _mockRepo;
    private readonly Mock<ILogger<CarsController>> _mockLogger;
    private readonly CarsController _controller;

    public CarsControllerTests()
    {
        _mockRepo = new Mock<ICarRepository>();
        _mockLogger = new Mock<ILogger<CarsController>>();

        _controller = new CarsController(_mockRepo.Object, _mockLogger.Object);
    }

    [Fact]
    public async Task Get_ShouldReturnAllCars_WhenNoFilterProvided()
    {
        
        var mockCars = new List<Car>
        {
            new Car { Make = "Ford", Model = "Fiesta", RegistrationNumber = "A", RegistrationExpiry = DateTime.UtcNow },
            new Car { Make = "Toyota", Model = "Camry", RegistrationNumber = "B", RegistrationExpiry = DateTime.UtcNow }
        };

        _mockRepo.Setup(repo => repo.GetCarsAsync(null))
                 .ReturnsAsync(mockCars);

        
        var result = await _controller.Get(null);

       var actionResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnedCars = Assert.IsAssignableFrom<IEnumerable<Car>>(actionResult.Value);
        
        Assert.Equal(2, returnedCars.Count());
    }

    [Fact]
    public async Task Get_ShouldPassMakeFilter_ToRepository()
    {
        
        string filter = "Toyota";
        
        await _controller.Get(filter);

         _mockRepo.Verify(repo => repo.GetCarsAsync(filter), Times.Once);
    }
}