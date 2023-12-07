
using System;
using Abp.Application.Services.Dto;

namespace ERP.Entities.Dtos
{
    public class FlipDto : EntityDto<Guid>
    {
		public string Address { get; set; }

		public DateTime? DatePurchased { get; set; }

		public long? PricePurchased { get; set; }

		public long? AmountRehab { get; set; }

		public DateTime DateSold { get; set; }

		public long AmountSold { get; set; }



    }
}