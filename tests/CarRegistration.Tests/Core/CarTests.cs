using CarRegistration.Core.Entities;

namespace CarRegistration.Tests.Core;

public class CarTests
{
    [Fact]
    public void IsRegistrationExpired_ShouldReturnTrue_WhenDateIsInPast()
    {
       var car = new Car
        {
            Make = "Test",
            Model = "Test",
            RegistrationNumber = "123",
            RegistrationExpiry = DateTime.UtcNow.AddDays(-1) 
        };

        var result = car.IsRegistrationExpired;

        Assert.True(result, "Car should be expired if date is in the past");
    }

    [Fact]
    public void IsRegistrationExpired_ShouldReturnFalse_WhenDateIsInFuture()
    {
         var car = new Car
        {
            Make = "Test",
            Model = "Test",
            RegistrationNumber = "123",
            RegistrationExpiry = DateTime.UtcNow.AddDays(1) 
        };

       var result = car.IsRegistrationExpired;

        Assert.False(result, "Car should NOT be expired if date is in the future");
    }
}