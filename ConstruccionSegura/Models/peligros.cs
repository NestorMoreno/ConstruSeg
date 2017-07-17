namespace ConstruccionSegura.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("construccionsegura.peligros")]
    public partial class peligros
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public peligros()
        {
            rpeligrosposiblesefectos = new HashSet<rpeligrosposiblesefectos>();
            recomendaciones = new HashSet<recomendaciones>();
            controlesriesgos = new HashSet<controlesriesgos>();
            tareas = new HashSet<tareas>();
        }

        [Key]
        public int idnPeligro { get; set; }

        public int idnGrupoPeligro { get; set; }

        [StringLength(45)]
        public string Nombre { get; set; }

        public virtual grupospeligros grupospeligros { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rpeligrosposiblesefectos> rpeligrosposiblesefectos { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<recomendaciones> recomendaciones { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<controlesriesgos> controlesriesgos { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<tareas> tareas { get; set; }
    }
}
