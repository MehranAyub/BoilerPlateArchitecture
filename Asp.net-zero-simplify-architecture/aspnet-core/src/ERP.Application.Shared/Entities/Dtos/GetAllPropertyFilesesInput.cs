using Abp.Application.Services.Dto;
using System;

namespace ERP.Entities.Dtos
{
    public class GetAllPropertyFilesesInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
        public Guid PropertyId { get; set; }
    }
}