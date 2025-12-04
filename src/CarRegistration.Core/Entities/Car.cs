namespace CarRegistration.Core.Entities;

public class Car
{
    public Guid Id { get; set; } = Guid.NewGuid();
    
    public required string Make { get; set; }
    public required string Model { get; set; }
    public required string RegistrationNumber { get; set; }
    
    public DateTime RegistrationExpiry { get; set; }

    public bool IsRegistrationExpired => DateTime.UtcNow > RegistrationExpiry;
}