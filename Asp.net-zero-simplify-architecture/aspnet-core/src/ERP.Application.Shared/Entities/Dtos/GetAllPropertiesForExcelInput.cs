using Abp.Application.Services.Dto;
using System;

namespace ERP.Entities.Dtos
{
    public class GetAllPropertiesForExcelInput
    {
        public string Filter { get; set; }

        public string AddressFilter { get; set; }

        public string PropertySpecsFilter { get; set; }

        public string DescriptionFilter { get; set; }

        public int? MaxWholeSalePriceFilter { get; set; }
        public int? MinWholeSalePriceFilter { get; set; }

        public int? MaxEstimatedARVFilter { get; set; }
        public int? MinEstimatedARVFilter { get; set; }

        public int? MaxEstimatedRehabFilter { get; set; }
        public int? MinEstimatedRehabFilter { get; set; }

        public string ViewingDescriptionFilter { get; set; }

        public int? MaxEMDRequirementFilter { get; set; }
        public int? MinEMDRequirementFilter { get; set; }

        public string ViewingContactFilter { get; set; }

        public string OfferContactFilter { get; set; }

    }
}