namespace ConstruccionSegura.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("construccionsegura.rpeligrosposiblesefectos")]
    public partial class rpeligrosposiblesefectos
    {
        [Key]
        [Column(Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int idnPeligro { get; set; }

        [Key]
        [Column(Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int idnPosibleEfecto { get; set; }

        [Column(TypeName = "timestamp")]
        public DateTime? dFechaModificacion { get; set; }

        public virtual peligros peligros { get; set; }

        public virtual posiblesefectos posiblesefectos { get; set; }
    }
}
