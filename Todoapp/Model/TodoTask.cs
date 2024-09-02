namespace Todoapp.Model
{
    public class TodoTask
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public DateOnly Deadline { get; set; }
        public DateTime Deadline { get; set; }

        //public bool IsCompleted { get; set; }
    }
}
