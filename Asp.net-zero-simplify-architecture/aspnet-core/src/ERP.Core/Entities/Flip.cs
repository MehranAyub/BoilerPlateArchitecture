using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;

namespace ERP.Entities
{
	[Table("Flips")]
    public class Flip : FullAuditedEntity<Guid> 
    {

		public virtual string Address { get; set; }
		
		public virtual DateTime? DatePurchased { get; set; }
		
		public virtual long? PricePurchased { get; set; }
		
		public virtual long? AmountRehab { get; set; }
		
		public virtual DateTime DateSold { get; set; }
		
		public virtual long AmountSold { get; set; }
		

    }
}