namespace ConstruccionSegura.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("construccionsegura.tiposrecomendaciones")]
    public partial class tiposrecomendaciones
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public tiposrecomendaciones()
        {
            recomendaciones = new HashSet<recomendaciones>();
        }

        [Key]
        public int idnTipoRecomendacion { get; set; }

        [StringLength(150)]
        public string Nombre { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<recomendaciones> recomendaciones { get; set; }
    }
}
