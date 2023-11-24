using ERP.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.Entities
{
    [Table("PropertyFileses")]
    public class PropertyFiles : FullAuditedEntity
    {

        public virtual string FileName { get; set; }

        public virtual byte[] ImageBytes { get; set; }

        public virtual string FileType { get; set; }

        public virtual Guid PropertyId { get; set; }

        [ForeignKey("PropertyId")]
        public Property PropertyFk { get; set; }

    }
}