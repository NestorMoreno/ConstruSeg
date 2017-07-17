namespace ConstruccionSegura.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("construccionsegura.recomendaciones")]
    public partial class recomendaciones
    {
        [Key]
        public int idnRecomendacion { get; set; }

        public int idnPeligro { get; set; }

        public int idnTipoRecomendacion { get; set; }

        [StringLength(100)]
        public string Nombre { get; set; }

        public virtual peligros peligros { get; set; }

        public virtual tiposrecomendaciones tiposrecomendaciones { get; set; }
    }
}
