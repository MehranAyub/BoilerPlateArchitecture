using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Dtos
{
    public class CreateOrEditPropertyFilesDto : EntityDto<int?>
    {

        public string FileName { get; set; }

        public byte[] ImageBytes { get; set; }

        public string FileType { get; set; }

        public Guid PropertyId { get; set; }

    }
}