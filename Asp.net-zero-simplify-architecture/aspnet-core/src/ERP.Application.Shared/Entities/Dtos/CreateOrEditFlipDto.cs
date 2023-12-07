
using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Dtos
{
    public class CreateOrEditFlipDto : EntityDto<Guid?>
    {

		public string Address { get; set; }
		
		
		public DateTime? DatePurchased { get; set; }
		
		
		public long? PricePurchased { get; set; }
		
		
		public long? AmountRehab { get; set; }
		
		
		public DateTime DateSold { get; set; }
		
		
		public long AmountSold { get; set; }
		
		

    }
}