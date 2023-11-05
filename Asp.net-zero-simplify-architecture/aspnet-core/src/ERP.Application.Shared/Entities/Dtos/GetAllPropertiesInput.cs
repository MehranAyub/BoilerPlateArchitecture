using Abp.Application.Services.Dto;
using System;

namespace ERP.Entities.Dtos
{
    public class GetAllPropertiesInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public string AddressFilter { get; set; }

        public string PropertySpecsFilter { get; set; }

        public string DescriptionFilter { get; set; }

        public long? MaxWholeSalePriceFilter { get; set; }
        public long? MinWholeSalePriceFilter { get; set; }

        public long? MaxEstimatedARVFilter { get; set; }
        public long? MinEstimatedARVFilter { get; set; }

        public long? MaxEstimatedRehabFilter { get; set; }
        public long? MinEstimatedRehabFilter { get; set; }

        public string ViewingDescriptionFilter { get; set; }

        public long? MaxEMDRequirementFilter { get; set; }
        public long? MinEMDRequirementFilter { get; set; }

        public string ViewingContactFilter { get; set; }

        public string OfferContactFilter { get; set; }

    }
}