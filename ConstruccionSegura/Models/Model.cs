namespace ConstruccionSegura.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model : DbContext
    {
        public Model()
            : base("name=ModelDB")
        {
        }

        public virtual DbSet<actividades> actividades { get; set; }
        public virtual DbSet<controlesriesgos> controlesriesgos { get; set; }
        public virtual DbSet<etapas> etapas { get; set; }
        public virtual DbSet<grupospeligros> grupospeligros { get; set; }
        public virtual DbSet<peligros> peligros { get; set; }
        public virtual DbSet<posiblesefectos> posiblesefectos { get; set; }
        public virtual DbSet<recomendaciones> recomendaciones { get; set; }
        public virtual DbSet<rpeligrosposiblesefectos> rpeligrosposiblesefectos { get; set; }
        public virtual DbSet<tareas> tareas { get; set; }
        public virtual DbSet<tiposconstruccion> tiposconstruccion { get; set; }
        public virtual DbSet<tiposrecomendaciones> tiposrecomendaciones { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<actividades>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<actividades>()
                .HasMany(e => e.tareas)
                .WithMany(e => e.actividades)
                .Map(m => m.ToTable("ractividadestareas", "construccionsegura").MapLeftKey("idnActividad").MapRightKey("idnTarea"));

            modelBuilder.Entity<controlesriesgos>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<controlesriesgos>()
                .Property(e => e.Comodin)
                .IsUnicode(false);

            modelBuilder.Entity<controlesriesgos>()
                .HasMany(e => e.peligros)
                .WithMany(e => e.controlesriesgos)
                .Map(m => m.ToTable("rcontrolesriesgospeligros", "construccionsegura").MapLeftKey("idnControlRiesgo").MapRightKey("idnPeligro"));

            modelBuilder.Entity<etapas>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<etapas>()
                .HasMany(e => e.actividades)
                .WithRequired(e => e.etapas)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<etapas>()
                .HasMany(e => e.tiposconstruccion)
                .WithMany(e => e.etapas)
                .Map(m => m.ToTable("retapastiposconstruccion", "construccionsegura").MapLeftKey("idnEtapa").MapRightKey("idnTipoConstruccion"));

            modelBuilder.Entity<grupospeligros>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<grupospeligros>()
                .HasMany(e => e.peligros)
                .WithRequired(e => e.grupospeligros)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<peligros>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<peligros>()
                .HasMany(e => e.rpeligrosposiblesefectos)
                .WithRequired(e => e.peligros)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<peligros>()
                .HasMany(e => e.recomendaciones)
                .WithRequired(e => e.peligros)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<peligros>()
                .HasMany(e => e.tareas)
                .WithMany(e => e.peligros)
                .Map(m => m.ToTable("rpeligrostareas", "construccionsegura").MapLeftKey("idnPeligro").MapRightKey("idnTarea"));

            modelBuilder.Entity<posiblesefectos>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<posiblesefectos>()
                .HasMany(e => e.rpeligrosposiblesefectos)
                .WithRequired(e => e.posiblesefectos)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<recomendaciones>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<tareas>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<tiposconstruccion>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<tiposrecomendaciones>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<tiposrecomendaciones>()
                .HasMany(e => e.recomendaciones)
                .WithRequired(e => e.tiposrecomendaciones)
                .WillCascadeOnDelete(false);
        }
    }
}
