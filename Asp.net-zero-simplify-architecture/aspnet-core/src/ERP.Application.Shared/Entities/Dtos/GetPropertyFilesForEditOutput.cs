using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;

namespace ERP.Entities.Dtos
{
    public class GetPropertyFilesForEditOutput
    {
        public CreateOrEditPropertyFilesDto PropertyFiles { get; set; }

        public string PropertyPropertySpecs { get; set; }

    }
}