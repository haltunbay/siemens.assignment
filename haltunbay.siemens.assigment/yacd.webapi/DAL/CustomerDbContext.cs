using System.Reflection;
using Microsoft.EntityFrameworkCore;
using yacd.webapi.DAL.Models;

namespace yacd.webapi.DAL
{
    public class CustomerDbContext : DbContext
    {
        public DbSet<Customer> Customers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source=customers.db;");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasKey(c => new { c.FirstName, c.LastName});
            modelBuilder.Entity<Customer>().ToTable("Customers");
        }
    }
}