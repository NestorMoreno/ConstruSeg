namespace ConstruccionSegura.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("construccionsegura.posiblesefectos")]
    public partial class posiblesefectos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public posiblesefectos()
        {
            rpeligrosposiblesefectos = new HashSet<rpeligrosposiblesefectos>();
        }

        [Key]
        public int idnPosibleEfecto { get; set; }

        [StringLength(150)]
        public string Nombre { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<rpeligrosposiblesefectos> rpeligrosposiblesefectos { get; set; }
    }
}
