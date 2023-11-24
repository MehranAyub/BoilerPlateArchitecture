using System;
using Abp.Application.Services.Dto;

namespace ERP.Entities.Dtos
{
    public class PropertyFilesDto : EntityDto
    {
        public string FileName { get; set; }

        public Guid PropertyId { get; set; }
        public byte[] ImageBytes{ get; set; }

    }
}