using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;
using static ERP.Entities.Dtos.Enums;

namespace ERP.Entities.Dtos
{
    public class CreateOrEditPropertyDto : EntityDto<Guid?>
    {
        public CreateOrEditPropertyDto()
        {
            this.PropertyStatus = PropertyStatusDto.IsForRent; // Default value

            this.IsFeatured = false; // Default value
        }

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
        public virtual PropertyStatusDto PropertyStatus { get; set; }
        public virtual Boolean IsFeatured { get; set; }

    }
}