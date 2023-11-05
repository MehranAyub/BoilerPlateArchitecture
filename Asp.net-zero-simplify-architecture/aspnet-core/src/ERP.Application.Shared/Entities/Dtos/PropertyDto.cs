using System;
using Abp.Application.Services.Dto;

namespace ERP.Entities.Dtos
{
    public class PropertyDto : EntityDto<Guid>
    {
        public string Address { get; set; }

        public string PropertySpecs { get; set; }

        public string Description { get; set; }

        public long WholeSalePrice { get; set; }

        public long? EstimatedARV { get; set; }

        public long? EstimatedRehab { get; set; }

        public string ViewingDescription { get; set; }

        public long EMDRequirement { get; set; }

        public string ViewingContact { get; set; }

        public string OfferContact { get; set; }

    }
}