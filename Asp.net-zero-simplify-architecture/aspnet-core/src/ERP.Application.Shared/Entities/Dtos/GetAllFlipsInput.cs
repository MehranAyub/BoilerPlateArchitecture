using Abp.Application.Services.Dto;
using System;

namespace ERP.Entities.Dtos
{
    public class GetAllFlipsInput : PagedAndSortedResultRequestDto
    {
		public string Filter { get; set; }

		public string AddressFilter { get; set; }

		public DateTime? MaxDatePurchasedFilter { get; set; }
		public DateTime? MinDatePurchasedFilter { get; set; }

		public long? MaxPricePurchasedFilter { get; set; }
		public long? MinPricePurchasedFilter { get; set; }

		public long? MaxAmountRehabFilter { get; set; }
		public long? MinAmountRehabFilter { get; set; }

		public DateTime? MaxDateSoldFilter { get; set; }
		public DateTime? MinDateSoldFilter { get; set; }

		public long? MaxAmountSoldFilter { get; set; }
		public long? MinAmountSoldFilter { get; set; }


    }
}