namespace ConstruccionSegura.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("construccionsegura.controlesriesgos")]
    public partial class controlesriesgos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public controlesriesgos()
        {
            peligros = new HashSet<peligros>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int idnControlRiesgo { get; set; }

        public int idnTipoControl { get; set; }

        [StringLength(150)]
        public string Nombre { get; set; }

        [StringLength(45)]
        public string Comodin { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<peligros> peligros { get; set; }
    }
}
