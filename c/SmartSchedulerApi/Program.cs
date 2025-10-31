using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

var app = builder.Build();

// Enable Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use routing middleware (important!)
app.UseRouting();

// Default route to check if backend is running
app.MapGet("/", () => Results.Ok(new { message = "✅ Smart Scheduler API is running!" }));

// Smart Scheduler API endpoint
app.MapPost("/api/v1/projects/{projectId}/schedule", (string projectId, InputModel input) =>
{
    var order = input.Tasks.Select(t => t.Title).ToList();
    return Results.Ok(new { recommendedOrder = order });
});

// Run the app
app.Run();

public class InputModel
{
    public List<TaskItem> Tasks { get; set; } = new();
}

public class TaskItem
{
    public string Title { get; set; } = string.Empty;
    public int EstimatedHours { get; set; }
    public string DueDate { get; set; } = string.Empty;
    public List<string> Dependencies { get; set; } = new();
}
