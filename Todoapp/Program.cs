using Microsoft.EntityFrameworkCore;
using Todoapp.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();
// Add CORS policy to allow your ReactJS frontend to communicate with the backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.WithOrigins("http://localhost:3004") // Replace with your React frontend's URL if different
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Configure the DbContext with your SQL Server connection string
builder.Services.AddDbContext<TodoTasksContext>(options =>
{
    options.UseSqlServer("Server=DESKTOP-UB4UJGD;Database=TaskDB;Trusted_Connection=True;TrustServerCertificate=True;");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.MapControllers();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Enable CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapRazorPages();

app.Run();
