using Abp.Application.Services.Dto;
using System;
using static ERP.Entities.Dtos.Enums;

namespace ERP.Entities.Dtos
{
    public class GetAllPropertiesWithImagesInput : PagedAndSortedResultRequestDto
    {
        public GetAllPropertiesWithImagesInput() {
            PropertyStatus = PropertyStatusDto.IsForRent;
            IsFeatured = false;
        }
        public string Filter { get; set; }
        public virtual PropertyStatusDto PropertyStatus { get; set; }
        public virtual Boolean IsFeatured { get; set; }


    }
}