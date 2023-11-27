using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using System.Collections.Generic;

namespace ERP.Entities
{
    [Table("Properties")]
    public class Property : FullAuditedEntity<Guid>
    {
       public Property()
        {
            this.PropertyStatus = PropertyStatus.IsForRent; // Default value

            this.IsFeatured = false; // Default value
        }

        [Required]
        public virtual string Address { get; set; }

        public virtual string PropertySpecs { get; set; }

        [Required]
        public virtual string Description { get; set; }

        public virtual long? WholeSalePrice { get; set; }

        public virtual long? EstimatedARV { get; set; }

        public virtual long? EstimatedRehab { get; set; }

        public virtual string ViewingDescription { get; set; }

        public virtual long? EMDRequirement { get; set; }

        public virtual string ViewingContact { get; set; }

        public virtual string OfferContact { get; set; }
        public virtual PropertyStatus PropertyStatus { get; set; }
        public virtual Boolean   IsFeatured { get; set; }
        public ICollection<PropertyFiles> PropertyFiles { get; set; }
    }

       public enum PropertyStatus
        {
            IsForRent,
            IsForSale
        }
}