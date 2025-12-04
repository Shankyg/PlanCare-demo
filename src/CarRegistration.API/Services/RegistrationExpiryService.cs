using CarRegistration.API.Hubs;
using CarRegistration.Core.Interfaces;
using Microsoft.AspNetCore.SignalR;

namespace CarRegistration.API.Services;

public class RegistrationExpiryService : BackgroundService
{
    private readonly IHubContext<RegistrationHub> _hubContext;
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<RegistrationExpiryService> _logger;

    public RegistrationExpiryService(
        IHubContext<RegistrationHub> hubContext, 
        IServiceProvider serviceProvider,
        ILogger<RegistrationExpiryService> logger)
    {
        _hubContext = hubContext;
        _serviceProvider = serviceProvider;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Registration Expiry Service is starting.");

        using var timer = new PeriodicTimer(TimeSpan.FromSeconds(5));

        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            await CheckRegistrationsAndNotify(stoppingToken);
        }
    }

    private async Task CheckRegistrationsAndNotify(CancellationToken stoppingToken)
    {
        try
        {
            using var scope = _serviceProvider.CreateScope();
            var repository = scope.ServiceProvider.GetRequiredService<ICarRepository>();

            var cars = await repository.GetCarsAsync();

           var carStatuses = cars.Select(c => new 
            {
                c.RegistrationNumber,
                c.IsRegistrationExpired,
                c.Make,
                c.Model
            });

            await _hubContext.Clients.All.SendAsync("ReceiveRegistrationUpdate", carStatuses, cancellationToken: stoppingToken);
            
            _logger.LogInformation("Broadcasted registration status for {Count} cars.", carStatuses.Count());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurring while broadcasting registration statuses.");
        }
    }
}