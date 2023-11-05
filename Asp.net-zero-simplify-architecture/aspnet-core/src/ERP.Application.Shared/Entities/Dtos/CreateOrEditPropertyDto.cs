using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Dtos
{
    public class CreateOrEditPropertyDto : EntityDto<Guid?>
    {

        [Required]
        public string Address { get; set; }

        public string PropertySpecs { get; set; }

        [Required]
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