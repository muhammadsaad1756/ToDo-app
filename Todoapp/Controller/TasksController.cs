using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Todoapp.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class TasksController : ControllerBase
{
    private readonly TodoTasksContext _context;

    public TasksController(TodoTasksContext context)
    {
        _context = context;
    }

    // GET: api/Tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoTask>>> GetTasks()
    {
        try
        {
            return await _context.Tasks.ToListAsync();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // POST: api/Tasks
    [HttpPost]
    public async Task<ActionResult<TodoTask>> PostTask(TodoTask task)
    {

        Console.WriteLine($"Received Task: {task.Name}, Deadline: {task.Deadline}");
        if (task == null)
        {
            return BadRequest("Task cannot be null");
        }

        if (string.IsNullOrEmpty(task.Name) || string.IsNullOrEmpty(task.Deadline.ToString()))
        {
            return BadRequest("Name and Deadline are required");
        }

        try
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // GET: api/Tasks/5
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoTask>> GetTask(int id)
    {
        try
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // PUT: api/Tasks/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTask(int id, TodoTask task)
    {
        if (id != task.Id)
        {
            return BadRequest();
        }

        if (string.IsNullOrEmpty(task.Name) || string.IsNullOrEmpty(task.Deadline.ToString()))
        {
            return BadRequest("Name and Deadline are required");
        }

        try
        {
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // DELETE: api/Tasks/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        try
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}