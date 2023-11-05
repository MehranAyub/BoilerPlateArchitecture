using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.Entities
{
    [Table("Properties")]
    public class Property : FullAuditedEntity<Guid>
    {

        [Required]
        public virtual string Address { get; set; }

        public virtual string PropertySpecs { get; set; }

        [Required]
        public virtual string Description { get; set; }

        public virtual long WholeSalePrice { get; set; }

        public virtual long? EstimatedARV { get; set; }

        public virtual long? EstimatedRehab { get; set; }

        public virtual string ViewingDescription { get; set; }

        public virtual long EMDRequirement { get; set; }

        public virtual string ViewingContact { get; set; }

        public virtual string OfferContact { get; set; }

    }
}