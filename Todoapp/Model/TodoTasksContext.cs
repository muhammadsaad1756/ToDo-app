using Microsoft.EntityFrameworkCore;

namespace Todoapp.Model
{
    public class TodoTasksContext:DbContext
    {
        public DbSet<TodoTask> Tasks { get; set; }

        //constructor
        public TodoTasksContext(DbContextOptions options) : base(options)
        {

        }
    }
}
